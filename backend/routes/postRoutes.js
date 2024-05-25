const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const postController = require('../controllers/postController');
const auth = require('../routes/middleware');
const Post = require('../models/Post'); // Ensure this is imported
const User = require('../models/User');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const request = require('request');
const { v4: uuidv4 } = require('uuid'); // Import UUID library
const Certificate = require('../models/Certificate');
const path = require('path');
const fs = require('fs');
require('dotenv').config(); 

// Get all posts
router.get('/', postController.getPosts);
// Get post by slug
router.get('/post/:slug', postController.getPostBySlug);
router.get('/search', postController.searchPosts);

// Get user-specific posts
router.get('/user', auth, postController.getUserPosts);

// Create a post
router.post('/', [
    auth,
    [
        check('title', 'Title is required').not().isEmpty(),
        check('content', 'Content is required').not().isEmpty(),

        check('subtitles', 'Subtitles must be an array').isArray(),
        check('subtitles.*.title', 'Subtitle title is required').not().isEmpty(),
        check('subtitles.*.bulletPoints', 'Bullet points must be an array').isArray(),
        check('subtitles.*.bulletPoints.*', 'Each bullet point must be a string').isString()
    ]
], postController.createPost);
// Function to check if all posts in a category are completed
const areAllPostsCompleted = async (categoryId) => {
    const categoryPosts = await Post.find({ category: categoryId });
    for (const post of categoryPosts) {
        if (!post.completed) {
            return false; // If any post is not completed, return false
        }
    }
    return true; // All posts are completed
};
// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    }
});
const generateCertificatePDF = (user, category) => {
    const uniqueId = uuidv4();
    const formattedDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    const userName = user.name.replace(/\s+/g, '_'); // Replace spaces with underscores for file naming
    const fileName = `${userName}_${category}_${formattedDate}_${uniqueId}.pdf`;
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({
            size: 'A4',
            layout: 'landscape',    
            margin: 20 // Further reduced margins
        });
        const filePath = path.join(__dirname, '..', 'uploads', 'certificates', fileName);

        const writeStream = fs.createWriteStream(filePath);

        doc.pipe(writeStream);

        const chunks = [];
        doc.on('data', chunk => chunks.push(chunk));
        doc.on('end', () => resolve({ buffer: Buffer.concat(chunks), uniqueId, filePath }));
        doc.on('error', reject);
        // Add event listeners to ensure the write stream completes
        writeStream.on('finish', () => {
            resolve({ filePath, uniqueId });
        });

        writeStream.on('error', (err) => {
            reject(err);
        });

        // Load background image
        request.get('https://sanjaybasket.s3.ap-south-1.amazonaws.com/HogwartsEdX/background-certificate-HogwartsEdx.jpg', { encoding: null }, (err, res, body) => {
            if (err) return reject(err);

            // Add blurred background image
            doc.image(body, 0, 0, { width: doc.page.width, height: doc.page.height });

            // Shining Border
            doc.save()
                .rect(10, 10, doc.page.width - 20, doc.page.height - 20)
                .lineWidth(5)
                .strokeColor('#FFD700')
                .stroke()
                .restore();

            // Certificate Title
            doc.registerFont('HarryP', path.join(__dirname, '..', 'uploads', 'fonts', 'HARRYP__.TTF'));
            doc.fontSize(60).font('HarryP').fillColor('#000000').text('Certificate of Completion', {
                align: 'center',
                underline: true
            }).moveDown(0.8);

            // Subtitle
            doc.fontSize(28).font('HarryP').fillColor('#000000').text('This certifies that', {
                align: 'center'
            }).moveDown(0.5);

            // User's Name
            doc.fontSize(40).font('HarryP').fillColor('#000000').text(user.name, {
                align: 'center',
                underline: true
            }).moveDown(0.5);

            // Content
            doc.fontSize(28).font('HarryP').fillColor('#000000').text('has successfully completed all modules in the', {
                align: 'center'
            }).moveDown(0.5);

            // Category Name
            doc.fontSize(40).font('HarryP').fillColor('#000000').text(category, {
                align: 'center',
                underline: true
            }).moveDown(0.5);

            // Date
            doc.fontSize(24).font('HarryP').fillColor('#000000').text(`Category on ${new Date().toLocaleDateString()}`, {
                align: 'center'
            }).moveDown(0.5);

            // Additional Content related to HogwartsEdx and technology
            doc.fontSize(20).font('HarryP').fillColor('#000000').text('The bearer of this certificate has demonstrated proficiency', {
                align: 'center'
            }).moveDown(0.5);

            doc.fontSize(20).font('HarryP').fillColor('#000000').text('in the magical arts of technology through completion', {
                align: 'center'
            }).moveDown(0.5);

            doc.fontSize(20).font('HarryP').fillColor('#000000').text('of courses at HogwartsEdx.', {
                align: 'center'
            }).moveDown(0.5);

            // Signature and Footer
            const signatureX = doc.page.width - 250; // Adjust this value to move left/right
            const signatureY = doc.page.height - 100; // Adjust this value to move up/down

            doc.fontSize(13).font('HarryP').fillColor('#000000').text('Sanjay Patidar', signatureX, signatureY).moveUp(0.5);
            doc.fontSize(11).font('HarryP').fillColor('#000000').text('Founder: HogwartsEdx', signatureX, signatureY + 15);

            // Load signature image
            request.get('https://sanjaybasket.s3.ap-south-1.amazonaws.com/HogwartsEdX/signature.png', { encoding: null }, (err, res, body) => {
                if (err) return reject(err);

                doc.image(body, signatureX, signatureY + 40, { width: 100, height: 50 }) // Adjusted position and margin
                    .opacity(1); // Adjust opacity for better visibility against dark background

                // Verification Link
                const verifyLinkX = doc.page.width / 2;
                const verifyLinkY = doc.page.height - 60;

                doc.fontSize(14).font('HarryP').fillColor('#000000').text(`Verify certificate: /${uniqueId}`, {
                    align: 'center',
                    link: `http://localhost:5173/verify/${uniqueId}`,

                    continued: true
                }).moveTo(verifyLinkX, verifyLinkY).text('.', {
                    continued: true
                }).text('.', {
                    continued: true
                }).text('.', {
                    continued: true
                }).moveDown(1);

                doc.end();
            });
       

            });
        });
};




router.put('/complete/:postId', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ msg: 'Post not found' });

        const user = await User.findById(req.user.id);
        if (!user.completedPosts.includes(post.id)) {
            user.completedPosts.push(post.id);
            await user.save();
        } else {
            return res.status(400).json({ msg: 'Post already marked as completed' });
        }

        const categoryPosts = await Post.find({ category: post.category });
        const allCompleted = categoryPosts.every(p => user.completedPosts.includes(p.id));

        if (allCompleted) {
            const { filePath, uniqueId } = await generateCertificatePDF(user, post.category);

            const certificate = new Certificate({
                user: user._id,
                category: post.category,
                uniqueId,
                filePath
            });
            await certificate.save();

            // Send email to the user
            const mailOptions = {
                from: 'workrework.sanjay@gmail.com',
                to: user.email,
                subject: `Congratulations! You've completed all modules in the ${post.category} category!`,
                html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <header style="text-align: center; margin-bottom: 20px;">
                        <img src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/communityZ/logoWeb.png" alt="EduXcel Logo" style="max-width: 200px;">
                    </header>
                    <section style="background-color: #f8f9fa; padding: 20px; border-radius: 10px;">
                        <h2 style="text-align: center; color: #007bff;">Congratulations, ${user.name}!</h2>
                        <p style="font-size: 16px; color: #333; text-align: center;">You've successfully completed all the modules in the <strong>${post.category}</strong> category. Keep up the great work!</p>
                        <p style="font-size: 16px; color: #333; text-align: center;">Please find your certificate of completion attached to this email.</p>
                    </section>
                    <footer style="text-align: center; margin-top: 20px;">
                        <p style="font-size: 14px; color: #777;">Thank you for being a part of EduXcel!</p>
                        <p style="font-size: 14px; color: #777;">For any queries, contact us at <a href="mailto:support@eduxcel.com">support@eduxcel.com</a></p>
                    </footer>
                </div>
                `,
                attachments: [{
                    filename: 'Certificate_of_Completion.pdf',
                    path: filePath,
                    contentType: 'application/pdf'
                }]
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(`Error: ${error}`);
                }
                console.log('Email sent: ' + info.response);
            });

            res.json({ msg: 'Certificate generated and sent to your email', certificate });
        } else {
            res.json({ msg: 'Post marked as completed', completedPosts: user.completedPosts });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// Fetch completed posts for a user
router.get('/completed', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('completedPosts');
        res.json(user.completedPosts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
;



module.exports = router;

const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');
// Route to get certificate by uniqueId
router.get('/:uniqueId', async (req, res) => {
    try {
        const certificate = await Certificate.findOne({ uniqueId: req.params.uniqueId }).populate('user', 'name');
        if (!certificate) {
            return res.status(404).json({ msg: 'Certificate not found' });
        }
        res.json(certificate);
    } catch (err) {
        console.error("Server error:", err.message);
        res.status(500).send('Server error');
    }
});

router.get('/:uniqueId/download', async (req, res) => {
    try {
        const certificate = await Certificate.findOne({ uniqueId: req.params.uniqueId });
        if (!certificate) {
            return res.status(404).json({ msg: 'Certificate not found' });
        }

        const filePath = certificate.filePath;
        const fileName = path.basename(filePath);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ msg: 'File not found' });
        }

        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error("Error downloading file:", err.message);
                res.status(500).send('Server error');
            }
        });
    } catch (err) {
        console.error("Server error:", err.message);
        res.status(500).send('Server error');
    }
});

router.get('/', async (req, res) => {
    try {
        let query = {};
        const { userName, uniqueId, date } = req.query;

        if (userName) {
            const users = await User.find({ name: { $regex: new RegExp(userName, 'i') } });
            const userIds = users.map(user => user._id);
            query['user'] = { $in: userIds };
        }

        if (uniqueId) {
            query['uniqueId'] = uniqueId;
        }

        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            query['date'] = { $gte: startOfDay, $lte: endOfDay };
        }

        const certificates = await Certificate.find(query).populate('user', 'name');
        res.json(certificates);
    } catch (err) {
        console.error("Server error:", err.message);
        res.status(500).send('Server error');
    }
});




module.exports = router;

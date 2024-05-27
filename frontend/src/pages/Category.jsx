import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { useDispatch, useSelector } from 'react-redux';
import { followCategory, unfollowCategory } from '../actions/notificationActions';
import '../styles/Category.css';
import {
    FaHtml5, FaCss3Alt, FaJs, FaNodeJs, FaReact, FaAngular, FaVuejs,
    FaPython, FaJava, FaPhp, FaSwift, FaGithub
} from 'react-icons/fa';
import {
    SiTypescript, SiGatsby, SiSvelte, SiGraphql, SiRuby, SiCsharp,
    SiCplusplus, SiKotlin, SiDart, SiFlutter, SiReactos
} from 'react-icons/si';
import Modal from '../components/Modal'; // Import the modal component
const categories = [
    { name: 'VS Code', icon: <FaGithub /> },
    { name: 'HTML', icon: <FaHtml5 /> },
    { name: 'CSS', icon: <FaCss3Alt /> },
    { name: 'JavaScript', icon: <FaJs /> },
    { name: 'Node.js', icon: <FaNodeJs /> },
    { name: 'React', icon: <FaReact /> },
    { name: 'Angular', icon: <FaAngular /> },
    { name: 'Vue.js', icon: <FaVuejs /> },
    { name: 'Next.js', icon: <FaReact /> },
    { name: 'Nuxt.js', icon: <FaVuejs /> },
    { name: 'Gatsby', icon: <SiGatsby /> },
    { name: 'Svelte', icon: <SiSvelte /> },
    { name: 'TypeScript', icon: <SiTypescript /> },
    { name: 'GraphQL', icon: <SiGraphql /> },
    { name: 'PHP', icon: <FaPhp /> },
    { name: 'Python', icon: <FaPython /> },
    { name: 'Ruby', icon: <SiRuby /> },
    { name: 'Java', icon: <FaJava /> },
    { name: 'C#', icon: <SiCsharp /> },
    { name: 'C++', icon: <SiCplusplus /> },
    { name: 'Swift', icon: <FaSwift /> },
    { name: 'Kotlin', icon: <SiKotlin /> },
    { name: 'Dart', icon: <SiDart /> },
    { name: 'Flutter', icon: <SiFlutter /> },
    { name: 'React Native', icon: <SiReactos /> }
];

const Category = () => {
  const dispatch = useDispatch();
  const followedCategories = useSelector(state => state.notifications.followedCategories);
  const token = useSelector(state => state.auth.token);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [categoryToUnfollow, setCategoryToUnfollow] = useState('');

  const handleFollow = (category) => {
    dispatch(followCategory(category, token));
  };

  const handleUnfollow = (category) => {
    setCategoryToUnfollow(category);
    setShowConfirmation(true);
  };

  const confirmUnfollow = () => {
    dispatch(unfollowCategory(categoryToUnfollow, token));
    setShowConfirmation(false);
  };

  const cancelUnfollow = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="category">
      <h2>Categories</h2>
      <ul>
        {categories.map((category, index) => {
          const animationProps = useSpring({
            from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
            to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
            config: { duration: 1000 },
            delay: index * 200,
          });

          const isFollowed = followedCategories.includes(category.name);

          return (
            <animated.li key={category.name} className="category-item" style={animationProps}>
              <Link to={`/category/${category.name}`}>
                {category.icon}
                <span>{category.name}</span>
              </Link>
              {isFollowed ? (
                <button onClick={() => handleUnfollow(category.name)}>Unfollow</button>
              ) : (
                <button onClick={() => handleFollow(category.name)}>Follow</button>
              )}
            </animated.li>
          );
        })}
      </ul>
      {/* Confirmation modal */}
      {showConfirmation && (
        <Modal
          message={`Are you sure you want to unfollow ${categoryToUnfollow}?`}
          onConfirm={confirmUnfollow}
          onCancel={cancelUnfollow}
        />
      )}
    </div>
  );
};

export default Category;

// Notification.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications, markNotificationAsRead } from '../actions/notificationActions';
import axios from 'axios';
import styled from 'styled-components';

// Styled components for notifications
const NotificationWrapper = styled.div`
  position: fixed;
  top: ${({ isOpen }) => (isOpen ? '20px' : '-300px')};
  right: 20px;
  z-index: 1000;
  transition: top 0.3s ease;
`;

const NotificationItem = styled.div`
  background-color: #fff;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  ${({ isVisible }) => !isVisible && 'display: none;'}
`;

const MessageContent = styled.span`
  margin-right: 10px;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;

const MarkAsReadButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  margin-left: 10px;
`;

const ContinuousIcon = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  color: ${({ hasUnread }) => (hasUnread ? '#ff4500' : '#007bff')};
  font-size: 24px;
  z-index: 1000;
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotificationCounter = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupNotification = styled.div`
  position: fixed;
  top: 100px;
  right: 20px;
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
  animation: slideIn 0.5s ease;
`;

const Notification = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications.notifications || []);
  const [followedCategories, setFollowedCategories] = useState([]);
  const token = useSelector(state => state.auth.token);
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchFollowedCategories = async () => {
      try {
        const res = await axios.get('https://hogwartsedx-api-26jun.onrender.com/api/auth/user', {
          headers: {
            'x-auth-token': token
          }
        });
        setFollowedCategories(res.data.followedCategories || []);
      } catch (err) {
        console.error(err.message);
      }
    };

    if (token) {
      fetchFollowedCategories();
    }
  }, [token]);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    const newNotification = notifications.find(notification => !notification.isRead);
    if (newNotification) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    }
  }, [notifications]);

  const handleMarkAsRead = (id) => {
    dispatch(markNotificationAsRead(id));
  };

  const toggleNotification = () => {
    setIsOpen(!isOpen);
  };

  const hasUnreadNotifications = notifications.some(notification => !notification.isRead);
  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  const handleHideMessage = (id) => {
    dispatch(markNotificationAsRead(id));
  };

  return (
    <>
      <ContinuousIcon hasUnread={hasUnreadNotifications} onClick={toggleNotification}>
        {hasUnreadNotifications ? '🔔' : '🔕'}
        {unreadCount > 0 && <NotificationCounter>{unreadCount}</NotificationCounter>}
      </ContinuousIcon>
      <NotificationWrapper isOpen={isOpen}>
        {notifications.map(notification => (
          <NotificationItem key={notification._id} isVisible={!notification.isRead}>
            <MessageContent>{notification.message}</MessageContent>
            {!notification.isRead && (
              <MarkAsReadButton onClick={() => handleMarkAsRead(notification._id)}>Mark as read</MarkAsReadButton>
            )}
            <CloseButton onClick={() => handleHideMessage(notification._id)}>❌</CloseButton>
          </NotificationItem>
        ))}
      </NotificationWrapper>
      {showPopup && <PopupNotification>New post added!</PopupNotification>}
    </>
  );
};

export default Notification;

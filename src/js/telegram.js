// Telegram Web App Integration

// Initialize Telegram Web App
const tg = window.Telegram.WebApp;

// Expand the web app to full height
tg.expand();

// Enable closing confirmation
tg.enableClosingConfirmation();

// Set header color to match design
tg.setHeaderColor('#FFFFFF');
tg.setBackgroundColor('#FFFFFF');

// Add class to body for TWA-specific styles
document.body.classList.add('twa');

// Get user data from Telegram
const user = tg.initDataUnsafe?.user;

console.log('Telegram Web App initialized');
console.log('User:', user);
console.log('Platform:', tg.platform);
console.log('Version:', tg.version);

// Function to send data back to bot
function sendDataToBot(data) {
    try {
        tg.sendData(JSON.stringify(data));
        console.log('Data sent to bot:', data);
    } catch (error) {
        console.error('Error sending data to bot:', error);
    }
}

// Function to open external link
function openLink(url) {
    tg.openLink(url);
}

// Function to show alert
function showAlert(message) {
    tg.showAlert(message);
}

// Function to show confirm dialog
function showConfirm(message, callback) {
    tg.showConfirm(message, callback);
}

// Function to show popup
function showPopup(params) {
    tg.showPopup(params);
}

// Handle main button
function setupMainButton(text, onClick) {
    tg.MainButton.setText(text);
    tg.MainButton.show();
    tg.MainButton.onClick(onClick);
}

function hideMainButton() {
    tg.MainButton.hide();
}

// Handle back button
function setupBackButton(onClick) {
    tg.BackButton.show();
    tg.BackButton.onClick(onClick);
}

function hideBackButton() {
    tg.BackButton.hide();
}

// Haptic feedback
function hapticFeedback(type = 'medium') {
    if (tg.HapticFeedback) {
        switch (type) {
            case 'light':
                tg.HapticFeedback.impactOccurred('light');
                break;
            case 'medium':
                tg.HapticFeedback.impactOccurred('medium');
                break;
            case 'heavy':
                tg.HapticFeedback.impactOccurred('heavy');
                break;
            case 'success':
                tg.HapticFeedback.notificationOccurred('success');
                break;
            case 'warning':
                tg.HapticFeedback.notificationOccurred('warning');
                break;
            case 'error':
                tg.HapticFeedback.notificationOccurred('error');
                break;
            default:
                tg.HapticFeedback.selectionChanged();
        }
    }
}

// Export functions for use in other scripts
window.TelegramWebApp = {
    tg,
    user,
    sendDataToBot,
    openLink,
    showAlert,
    showConfirm,
    showPopup,
    setupMainButton,
    hideMainButton,
    setupBackButton,
    hideBackButton,
    hapticFeedback
};
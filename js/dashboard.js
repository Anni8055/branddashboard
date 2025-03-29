document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const sections = document.querySelectorAll('.dashboard-section');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            
            // Update active nav link
            navLinks.forEach(link => {
                link.parentElement.classList.remove('active');
            });
            this.parentElement.classList.add('active');
            
            // Show target section, hide others
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
        });
    });
    
    // Campaign Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Here you would typically filter the campaign list
            // based on the selected tab (active, draft, completed)
            const tabType = this.getAttribute('data-tab');
            console.log(`Showing ${tabType} campaigns`);
            
            // This would be replaced with actual filtering logic
            // filterCampaigns(tabType);
        });
    });
    
    // Create Campaign Modal
    const createCampaignBtn = document.getElementById('create-campaign-btn');
    const campaignModal = document.getElementById('campaign-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const saveDraftBtn = document.getElementById('save-draft');
    const campaignForm = document.getElementById('campaign-form');
    
    if (createCampaignBtn) {
        createCampaignBtn.addEventListener('click', function() {
            campaignModal.classList.add('active');
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            campaignModal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === campaignModal) {
            campaignModal.classList.remove('active');
        }
    });
    
    // Save campaign as draft
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Saving campaign as draft');
            // Logic to save campaign as draft
            
            // For demo purposes, we'll just close the modal
            campaignModal.classList.remove('active');
            
            // Show success notification (this would be implemented separately)
            showNotification('Campaign saved as draft', 'success');
        });
    }
    
    // Submit campaign form
    if (campaignForm) {
        campaignForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Creating new campaign');
            
            // Collect form data
            const formData = new FormData(this);
            const campaignData = {};
            
            for (const [key, value] of formData.entries()) {
                campaignData[key] = value;
            }
            
            console.log('Campaign Data:', campaignData);
            
            // Here you would typically send this data to your backend API
            // For demo purposes, we'll just close the modal
            campaignModal.classList.remove('active');
            
            // Show success notification
            showNotification('Campaign created successfully', 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    // Initialize performance chart
    initPerformanceChart();
    
    // Simulate real-time data updates
    simulateRealTimeData();
});

// Initialize Performance Chart
function initPerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Impressions',
                    data: [12000, 19000, 15000, 25000, 22000, 30000, 35000],
                    borderColor: '#4361ee',
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Engagement',
                    data: [7000, 8000, 9000, 10000, 11000, 14000, 16000],
                    borderColor: '#4cc9f0',
                    backgroundColor: 'rgba(76, 201, 240, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value >= 1000 ? value / 1000 + 'k' : value;
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
    
    // Allow access to the chart for real-time updates
    window.performanceChart = chart;
}

// Simulate real-time data updates
function simulateRealTimeData() {
    // Update notifications randomly
    setInterval(() => {
        const badge = document.querySelector('.notifications .badge');
        if (badge) {
            const currentCount = parseInt(badge.textContent);
            if (Math.random() > 0.7) {
                badge.textContent = currentCount + 1;
                showNotification('New notification received', 'info');
            }
        }
    }, 30000); // Every 30 seconds
    
    // Update performance chart with new data occasionally
    setInterval(() => {
        if (window.performanceChart && Math.random() > 0.5) {
            // Generate new random data
            const newImpressions = window.performanceChart.data.datasets[0].data.map(
                value => value * (0.95 + Math.random() * 0.1)
            );
            
            const newEngagement = window.performanceChart.data.datasets[1].data.map(
                value => value * (0.95 + Math.random() * 0.1)
            );
            
            // Update chart datasets
            window.performanceChart.data.datasets[0].data = newImpressions;
            window.performanceChart.data.datasets[1].data = newEngagement;
            
            // Refresh the chart
            window.performanceChart.update();
            
            console.log('Performance chart updated with new data');
        }
    }, 60000); // Every minute
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Add icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
        <button class="close-notification"><i class="fas fa-times"></i></button>
    `;
    
    // Create container if it doesn't exist
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
    
    // Add to DOM
    container.appendChild(notification);
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.close-notification');
    closeBtn.addEventListener('click', () => {
        notification.classList.add('closing');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('closing');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Add these additional styles dynamically (could also be added to CSS file)
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .notification {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        padding: 15px 20px;
        display: flex;
        align-items: center;
        min-width: 300px;
        max-width: 450px;
        animation: slideIn 0.3s ease forwards;
        transition: transform 0.3s ease, opacity 0.3s ease;
    }
    
    .notification.closing {
        transform: translateX(100%);
        opacity: 0;
    }
    
    .notification i {
        margin-right: 10px;
        font-size: 1.2rem;
    }
    
    .notification span {
        flex: 1;
    }
    
    .notification .close-notification {
        background: none;
        border: none;
        cursor: pointer;
        color: #999;
        padding: 0;
        margin-left: 10px;
    }
    
    .notification.info i {
        color: #4361ee;
    }
    
    .notification.success i {
        color: #4caf50;
    }
    
    .notification.error i {
        color: #f44336;
    }
    
    .notification.warning i {
        color: #ff9800;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

document.head.appendChild(notificationStyles);

// Initialize messaging system
function initMessaging() {
    const messageItems = document.querySelectorAll('.message-item');
    
    messageItems.forEach(item => {
        item.addEventListener('click', function() {
            // In a full implementation, this would open the messaging interface
            // For now, we'll just mark the message as read if it was unread
            if (this.classList.contains('unread')) {
                this.classList.remove('unread');
            }
            
            // Show a notification with the sender's name
            const senderName = this.querySelector('h4').textContent;
            showNotification(`Opening conversation with ${senderName}`, 'info');
        });
    });
}

// Initialize the messaging functionality on load
document.addEventListener('DOMContentLoaded', initMessaging); 
// Sample video data
const videos = [
    {
        id: 1,
        username: 'creativemind',
        displayName: 'Creative Mind',
        avatar: 'https://i.pravatar.cc/150?img=1',
        description: 'Amazing dance moves you need to see',
        hashtags: '#dance #creative #viral',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        likes: 1523,
        comments: 203,
        shares: 456,
        isFollowing: false
    },
    {
        id: 2,
        username: 'musiclover',
        displayName: 'Music Lover',
        avatar: 'https://i.pravatar.cc/150?img=2',
        description: 'Best music covers on TikTok',
        hashtags: '#music #cover #talented',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        likes: 2341,
        comments: 512,
        shares: 789,
        isFollowing: false
    },
    {
        id: 3,
        username: 'fitnessguru',
        displayName: 'Fitness Guru',
        avatar: 'https://i.pravatar.cc/150?img=3',
        description: 'Daily workout tips and motivation',
        hashtags: '#fitness #gym #workout',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        likes: 3456,
        comments: 789,
        shares: 1023,
        isFollowing: false
    },
    {
        id: 4,
        username: 'cookinghacks',
        displayName: 'Cooking Hacks',
        avatar: 'https://i.pravatar.cc/150?img=4',
        description: 'Quick and easy cooking recipes',
        hashtags: '#cooking #recipes #easy',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        likes: 1892,
        comments: 445,
        shares: 567,
        isFollowing: false
    },
    {
        id: 5,
        username: 'traveladventurer',
        displayName: 'Travel Adventurer',
        avatar: 'https://i.pravatar.cc/150?img=5',
        description: 'Exploring the world one video at a time',
        hashtags: '#travel #adventure #explore',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        likes: 4567,
        comments: 923,
        shares: 1234,
        isFollowing: false
    }
];

const recommendedCreators = [
    { id: 1, name: 'Sarah Tech', followers: '2.3M', avatar: 'https://i.pravatar.cc/150?img=10', isFollowing: false },
    { id: 2, name: 'John Beats', followers: '1.8M', avatar: 'https://i.pravatar.cc/150?img=11', isFollowing: false },
    { id: 3, name: 'Emma Art', followers: '956K', avatar: 'https://i.pravatar.cc/150?img=12', isFollowing: false },
    { id: 4, name: 'Alex Games', followers: '2.1M', avatar: 'https://i.pravatar.cc/150?img=13', isFollowing: false },
    { id: 5, name: 'Luna Fashion', followers: '3.2M', avatar: 'https://i.pravatar.cc/150?img=14', isFollowing: false }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadFeed();
    loadRecommendedCreators();
    setupEventListeners();
    // Buy coins quick button in monetization modal
    document.getElementById('openBuyCoins')?.addEventListener('click', openBuyCoinsModal);

    // Gift picker cancel
    document.getElementById('cancelGift')?.addEventListener('click', () => closeModal('giftPickerModal'));
});

// Load video feed
function loadFeed() {
    const feedContainer = document.querySelector('.feed-container');
    feedContainer.innerHTML = '';

    videos.forEach((video, idx) => {
        const videoCard = createVideoCard(video, idx);
        feedContainer.appendChild(videoCard);
    });
}

// Create video card element
function createVideoCard(videoData, index) {
    const card = document.createElement('div');
    card.className = 'video-card';
    // Build overlay-like card similar to TikTok
    const songText = videoData.song || `${videoData.username} - Original sound`;
    card.innerHTML = `
        <div class="video-wrapper vertical">
            <video src="${videoData.videoUrl}" preload="metadata" loop muted playsinline></video>

            <!-- Right action column -->
            <div class="video-actions">
                <button class="action-btn like-btn" data-video-id="${videoData.id}">
                    <i class="far fa-heart"></i>
                </button>
                <div class="action-count"><span>${formatNumber(videoData.likes)}</span></div>

                <button class="action-btn comment-btn" data-video-id="${videoData.id}">
                    <i class="far fa-comment"></i>
                </button>
                <div class="action-count"><span>${formatNumber(videoData.comments)}</span></div>

                <button class="action-btn share-btn" data-video-id="${videoData.id}">
                    <i class="far fa-share-square"></i>
                </button>
                <div class="action-count"><span>${formatNumber(videoData.shares)}</span></div>

                <button class="action-btn gift-btn" data-video-id="${videoData.id}" title="Send Gift">
                    <i class="fas fa-gift"></i>
                </button>
                <button class="action-btn offline-save-btn" data-video-id="${videoData.id}" title="Save Offline">
                    <i class="fas fa-download"></i>
                </button>
            </div>

            <!-- Bottom-left overlay info -->
            <div class="overlay-info">
                <div class="overlay-username">
                    <div class="avatar" style="width:40px; height:40px; border-radius:50%; background-image: url('${videoData.avatar}'); background-size:cover;"></div>
                    <div>
                        <div class="handle">@${videoData.username}</div>
                        <div style="font-size:12px; color:#999;">${videoData.displayName}</div>
                    </div>
                    <button class="follow-btn ${videoData.isFollowing ? 'following' : ''}" data-video-id="${videoData.id}" style="margin-left:10px;">${videoData.isFollowing ? 'Following' : 'Follow'}</button>
                </div>
                <div class="overlay-caption">${videoData.description}</div>
                <div class="overlay-song">
                    <div class="song-icon"><i class="fas fa-music"></i></div>
                    <div class="song-marquee"><span>${songText} • ${videoData.hashtags}</span></div>
                </div>
            </div>

            <!-- Rotating music disc -->
            <div class="music-disc" title="Album">
                <img src="${videoData.avatar}" alt="album" />
            </div>
        </div>
    `;

    // Add event listeners
    const likeBtn = card.querySelector('.like-btn');
    const commentBtn = card.querySelector('.comment-btn');
    const shareBtn = card.querySelector('.share-btn');
    const giftBtn = card.querySelector('.gift-btn');
    const followBtn = card.querySelector('.follow-btn');
    const videoEl = card.querySelector('video');
    const orientationBtn = card.querySelector('.orientation-btn');

    likeBtn.addEventListener('click', () => toggleLike(likeBtn, videoData.id));
    commentBtn.addEventListener('click', () => showCommentNotification());
    shareBtn.addEventListener('click', () => shareVideo(videoData.username));
    followBtn.addEventListener('click', () => toggleFollow(followBtn, videoData.id, videoData.username));
    videoEl.addEventListener('click', () => playVideoFullscreen(videoEl));

    if (giftBtn) {
        giftBtn.addEventListener('click', () => {
            openGiftPicker({ type: 'video', id: videoData.id, index });
        });
    }

    // offline save
    const offlineBtn = card.querySelector('.offline-save-btn');
    if (offlineBtn) {
        offlineBtn.addEventListener('click', () => {
            const saved = saveOfflineVideo({ id: videoData.id, videoUrl: videoData.videoUrl, description: videoData.description });
            if (saved) {
                showNotification('Video saved for offline viewing (demo).');
                logActivity(`Saved video ${videoData.id} offline`);
            } else showNotification('Failed to save offline.');
        });
    }

    // Orientation toggle: vertical (default) or horizontal
    if (orientationBtn) {
        // ensure default class
        const wrapper = card.querySelector('.video-wrapper');
        wrapper.classList.add('vertical');

        orientationBtn.addEventListener('click', () => {
            const current = orientationBtn.dataset.orientation;
            if (current === 'vertical') {
                // switch to horizontal
                orientationBtn.dataset.orientation = 'horizontal';
                orientationBtn.innerHTML = '<i class="fas fa-arrows-alt-h"></i>';
                wrapper.classList.remove('vertical');
                wrapper.classList.add('horizontal');
                card.classList.add('horizontal');
            } else {
                // switch to vertical
                orientationBtn.dataset.orientation = 'vertical';
                orientationBtn.innerHTML = '<i class="fas fa-arrows-alt-v"></i>';
                wrapper.classList.remove('horizontal');
                wrapper.classList.add('vertical');
                card.classList.remove('horizontal');
            }
        });
    }

    return card;
}

// Format numbers (1000 -> 1K)
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

// Toggle like
function toggleLike(btn, videoId) {
    btn.classList.toggle('liked');
    const icon = btn.querySelector('i');
    
    if (btn.classList.contains('liked')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        showNotification('Liked! ❤️');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
    }
}

// Local storage helpers for followers/following
function getFollowing() {
    try {
        return JSON.parse(localStorage.getItem('app_following') || '[]');
    } catch (e) { return []; }
}

function setFollowing(list) {
    localStorage.setItem('app_following', JSON.stringify(list));
}

function getFollowers() {
    try {
        return JSON.parse(localStorage.getItem('app_followers') || '[]');
    } catch (e) { return []; }
}

function setFollowers(list) {
    localStorage.setItem('app_followers', JSON.stringify(list));
}

// Toggle follow for a username; updates storage and UI
function toggleFollow(btn, videoId, username) {
    const following = getFollowing();
    const idx = following.indexOf(username);
    if (idx === -1) {
        following.push(username);
        btn.classList.add('following');
        btn.textContent = 'Following';
        showNotification(`You followed @${username} 👋`);
    } else {
        following.splice(idx, 1);
        btn.classList.remove('following');
        btn.textContent = 'Follow';
        showNotification(`Unfollowed @${username}`);
    }
    setFollowing(following);

    // update profile following count if profile belongs to current user
    const pf = document.getElementById('profileFollowing');
    if (pf) pf.textContent = formatNumber(getFollowing().length);
}

// Show comment notification
function showCommentNotification() {
    showNotification('Comment section opened 💬');
}

// Share video
function shareVideo(username) {
    showNotification(`Shared ${username}'s video! 📤`);
    
    // In a real app, this would open a share dialog
    if (navigator.share) {
        navigator.share({
            title: 'Check out this TikTok!',
            text: `Watch ${username}'s amazing video on TikTok!`,
            url: window.location.href
        });
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(37, 244, 238, 0.9);
        color: #000;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add slide animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Play video fullscreen
function playVideoFullscreen(video) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
    `;

    const fullscreenVideo = document.createElement('video');
    fullscreenVideo.src = video.src;
    fullscreenVideo.autoplay = true;
    fullscreenVideo.controls = true;
    fullscreenVideo.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 8px;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: none;
        border: none;
        color: #fff;
        font-size: 40px;
        cursor: pointer;
        z-index: 1000;
    `;

    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    modal.appendChild(fullscreenVideo);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
}

// Load recommended creators
function loadRecommendedCreators() {
    const creatorsList = document.querySelector('.recommended-list');
    creatorsList.innerHTML = '';

    recommendedCreators.forEach(creator => {
        const creatorElement = document.createElement('div');
        creatorElement.className = 'creator-item';
        creatorElement.innerHTML = `
            <div class="creator-info">
                <div class="creator-avatar" style="background-image: url('${creator.avatar}'); background-size: cover;"></div>
                <div class="creator-details">
                    <h4>${creator.name}</h4>
                    <p>${creator.followers} followers</p>
                </div>
            </div>
            <button class="follow-btn-small ${creator.isFollowing ? 'following' : ''}" data-creator-id="${creator.id}">
                ${creator.isFollowing ? 'Following' : 'Follow'}
            </button>
        `;

        const followBtn = creatorElement.querySelector('.follow-btn-small');
        followBtn.addEventListener('click', () => {
            followBtn.classList.toggle('following');
            followBtn.textContent = followBtn.classList.contains('following') ? 'Following' : 'Follow';
        });

        creatorsList.appendChild(creatorElement);
    });
}

// Setup event listeners for menu items
function setupEventListeners() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuItems.forEach(m => m.classList.remove('active'));
            item.classList.add('active');
            showNotification(`Navigated to ${item.textContent.trim()}`);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            showNotification(`Searching for "${searchInput.value}"`);
        }
    });

    // Upload button
    const uploadBtn = document.querySelector('.btn-upload');
    const uploadInput = document.getElementById('uploadInput');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // trigger hidden file input
            if (uploadInput) uploadInput.click();
            else showNotification('Upload input not available.');
        });
    }

    // Handle selected file and create a new video card
    if (uploadInput) {
        uploadInput.addEventListener('change', (ev) => {
            const file = ev.target.files && ev.target.files[0];
            if (!file) return;

            // Only accept video files
            if (!file.type.startsWith('video/')) {
                showNotification('Please select a video file.');
                uploadInput.value = '';
                return;
            }

            const url = URL.createObjectURL(file);
            // Create a minimal video object
            const newVideo = {
                id: 'u_' + Date.now(),
                username: 'you',
                displayName: 'You',
                avatar: 'https://i.pravatar.cc/150?img=55',
                videoUrl: url,
                likes: 0,
                comments: 0,
                shares: 0,
                description: file.name,
                hashtags: '',
                song: 'Uploaded sound',
                isFollowing: false
            };

            // Prepend to feed
            const feedContainer = document.querySelector('.feed-container');
            const card = createVideoCard(newVideo, 0);
            if (feedContainer) feedContainer.prepend(card);

            showNotification('Upload successful — video added to your feed.');
            // clear the input so same file can be reselected later
            uploadInput.value = '';
        });
    }

// Activity logging
function logActivity(msg) {
    try {
        const list = JSON.parse(localStorage.getItem('app_activity') || '[]');
        list.unshift({ ts: Date.now(), text: msg });
        localStorage.setItem('app_activity', JSON.stringify(list.slice(0,200)));
    } catch (e) {}
}

function loadActivity() {
    try {
        return JSON.parse(localStorage.getItem('app_activity') || '[]');
    } catch (e) { return []; }
}

// Offline videos storage
function saveOfflineVideo(videoObj) {
    try {
        const arr = JSON.parse(localStorage.getItem('app_offline_videos') || '[]');
        arr.unshift(videoObj);
        localStorage.setItem('app_offline_videos', JSON.stringify(arr.slice(0,200)));
        return true;
    } catch (e) { return false; }
}

function loadOfflineVideos() {
    try { return JSON.parse(localStorage.getItem('app_offline_videos') || '[]'); } catch (e) { return []; }
}

// Make createVideoCard include Save Offline button
// (Patch: add event binding to existing card creation - we will add a handler here)

// Initialize profile related UI and handlers (more comprehensive)
function initProfileFeatureBindings() {
    // Assets
    document.getElementById('assetCoins').textContent = userCoins || 0;
    document.getElementById('assetGifts').textContent = userGifts || 0;
    document.getElementById('uploadAssetBtn')?.addEventListener('click', () => {
        const input = document.getElementById('assetUpload');
        if (input && input.files && input.files[0]) {
            const f = input.files[0];
            const url = URL.createObjectURL(f);
            const list = document.getElementById('assetsList');
            const el = document.createElement('div');
            el.style.background = '#0b0b0b'; el.style.border = '1px solid #222'; el.style.padding = '8px'; el.style.borderRadius = '6px';
            el.innerHTML = `<div style="height:80px; background-image:url('${url}'); background-size:cover; background-position:center; border-radius:4px"></div><div style="margin-top:6px; font-size:12px; color:#ddd">${f.name}</div>`;
            list.prepend(el);
            logActivity(`Uploaded asset ${f.name}`);
            showNotification('Asset uploaded (demo).');
            input.value = '';
        } else showNotification('Select a file first.');
    });

    // Tools
    document.getElementById('toolUpload')?.addEventListener('click', () => document.getElementById('uploadInput')?.click());
    document.getElementById('toolGoLive')?.addEventListener('click', openGoLiveModal);
    document.getElementById('toolBuyCoins')?.addEventListener('click', openMonetizeModal);
    document.getElementById('toolStudio')?.addEventListener('click', () => showNotification('Open Studio (demo)'));

    // Activity
    function renderActivity() {
        const container = document.getElementById('activityList');
        container.innerHTML = '';
        const arr = loadActivity();
        if (!arr.length) container.innerHTML = '<div style="color:#999">No recent activity.</div>';
        arr.forEach(a => {
            const el = document.createElement('div');
            el.style.padding = '8px'; el.style.borderBottom = '1px solid #111';
            el.innerHTML = `<div style="font-size:12px; color:#bbb">${new Date(a.ts).toLocaleString()}</div><div style="margin-top:4px;">${a.text}</div>`;
            container.appendChild(el);
        });
    }
    renderActivity();
    document.getElementById('clearActivity')?.addEventListener('click', () => { localStorage.removeItem('app_activity'); renderActivity(); showNotification('Activity cleared'); });

    // Offline list
    function renderOffline() {
        const ol = document.getElementById('offlineList');
        ol.innerHTML = '';
        const arr = loadOfflineVideos();
        if (!arr.length) ol.innerHTML = '<div style="color:#999">No offline videos saved.</div>';
        arr.forEach(v => {
            const el = document.createElement('div');
            el.style.background = '#0b0b0b'; el.style.border = '1px solid #222'; el.style.borderRadius = '8px'; el.style.overflow='hidden';
            el.innerHTML = `<video src="${v.videoUrl}" muted style="width:100%; height:100px; object-fit:cover" controls></video><div style="padding:8px; font-size:12px; color:#ddd">${v.description || 'Offline video'}</div>`;
            ol.appendChild(el);
        });
    }
    renderOffline();

    // QR generation
    document.getElementById('genQrBtn')?.addEventListener('click', () => {
        const profile = loadUserProfile();
        const data = `https://demo.app/user/${profile.handle || 'you'}`;
        const canvas = document.createElement('canvas'); canvas.width = 240; canvas.height = 240;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#0b0b0b'; ctx.fillRect(0,0,240,240);
        ctx.fillStyle = '#25f4ee';
        for (let i=0;i<240;i+=6) for (let j=0;j<240;j+=6) if (Math.random()>0.72) ctx.fillRect(i,j,4,4);
        const holder = document.getElementById('qrCanvas'); holder.innerHTML=''; holder.appendChild(canvas);
        const dl = document.getElementById('qrDownload'); dl.innerHTML = `<a href="${canvas.toDataURL('image/png')}" download="profile-qr.png" class="btn-modal-login">Download QR</a>`;
        logActivity('Generated QR code');
    });

    // Business tools
    document.getElementById('businessCampaign')?.addEventListener('click', () => { showNotification('Campaign created (demo)'); logActivity('Created campaign'); });
    document.getElementById('businessInsights')?.addEventListener('click', () => showNotification('Opening insights (demo)'));

    // Studio
    document.getElementById('studioUpload')?.addEventListener('click', () => document.getElementById('uploadInput')?.click());

    // Promote: populate with user's videos (uploaded + feed clips)
    function populatePromote() {
        const list = document.getElementById('promoteList'); list.innerHTML = '';
        const myVideos = videos.concat([]); // include demo videos; in real app filter by owner
        myVideos.slice(0,8).forEach(v => {
            const b = document.createElement('button');
            b.className = 'btn-modal-login'; b.style.padding='8px'; b.style.fontSize='13px'; b.textContent = v.description || v.id;
            b.addEventListener('click', () => {
                const budget = prompt('Enter promotion budget (USD)', '10');
                if (budget) { showNotification(`Promoted ${v.id} with $${budget} (demo)`); logActivity(`Promoted ${v.id} for $${budget}`); }
            });
            list.appendChild(b);
        });
    }
    populatePromote();

    // Settings & Privacy
    const settingNotifications = document.getElementById('settingNotifications');
    const settingEmailReports = document.getElementById('settingEmailReports');
    const privacyPrivateAccount = document.getElementById('privacyPrivateAccount');
    const privacyComments = document.getElementById('privacyComments');
    // load
    try {
        const s = JSON.parse(localStorage.getItem('app_settings')||'{}');
        settingNotifications.checked = !!s.notifications;
        settingEmailReports.checked = !!s.emailReports;
        privacyPrivateAccount.checked = !!s.privateAccount;
        privacyComments.checked = (s.comments===undefined)?true:!!s.comments;
    } catch(e){}
    document.getElementById('saveSettings')?.addEventListener('click', () => {
        const s = { notifications: settingNotifications.checked, emailReports: settingEmailReports.checked };
        localStorage.setItem('app_settings', JSON.stringify(s));
        showNotification('Settings saved'); logActivity('Updated settings');
    });
    document.getElementById('savePrivacy')?.addEventListener('click', () => {
        const p = { privateAccount: privacyPrivateAccount.checked, comments: privacyComments.checked };
        localStorage.setItem('app_privacy', JSON.stringify(p));
        showNotification('Privacy saved'); logActivity('Updated privacy settings');
    });
}

// Ensure profile features initialized when profile opens
const origOpenProfileModal = openProfileModal;
openProfileModal = function() {
    origOpenProfileModal();
    setTimeout(() => { initProfileTabs(); initProfileFeatureBindings(); }, 50);
};

    // Login button
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.addEventListener('click', () => {
        openLoginModal();
    });

    // Profile header button (quick access)
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openProfileModal();
        });
    }

    // Go Live button
    const goLiveBtn = document.getElementById('goLiveBtn');
    goLiveBtn.addEventListener('click', () => {
        openGoLiveModal();
    });

    // Monetize header button (visible when logged in)
    const monetizeBtn = document.getElementById('monetizeBtn');
    monetizeBtn?.addEventListener('click', () => {
        openMonetizeModal();
    });

    // Balance display - click to open monetize modal
    const balanceDisplay = document.getElementById('balanceDisplay');
    balanceDisplay?.addEventListener('click', () => {
        openMonetizeModal();
    });

    // Global orientation button (toggle all videos)
    const globalOrientationBtn = document.getElementById('globalOrientationBtn');
    if (globalOrientationBtn) {
        // default orientation
        globalOrientationBtn.dataset.orientation = 'vertical';
        globalOrientationBtn.addEventListener('click', () => {
            const current = globalOrientationBtn.dataset.orientation || 'vertical';
            const next = current === 'vertical' ? 'horizontal' : 'vertical';
            globalOrientationBtn.dataset.orientation = next;
            globalOrientationBtn.innerHTML = next === 'vertical' ? '<i class="fas fa-arrows-alt-v"></i>' : '<i class="fas fa-arrows-alt-h"></i>';

            // apply to all video cards
            document.querySelectorAll('.video-card').forEach(card => {
                const wrapper = card.querySelector('.video-wrapper');
                if (!wrapper) return;
                wrapper.classList.remove('vertical', 'horizontal');
                wrapper.classList.add(next);
                if (next === 'horizontal') card.classList.add('horizontal'); else card.classList.remove('horizontal');

                // update per-card button
                const localBtn = card.querySelector('.orientation-btn');
                if (localBtn) {
                    localBtn.dataset.orientation = next;
                    localBtn.innerHTML = next === 'vertical' ? '<i class="fas fa-arrows-alt-v"></i>' : '<i class="fas fa-arrows-alt-h"></i>';
                }
            });
        });
    }

    // User menu toggle
    const userMenuBtn = document.querySelector('.nav-buttons');
    const userMenu = document.getElementById('userMenu');
    userMenuBtn.addEventListener('click', (e) => {
        if (e.target.closest('.user-menu') || e.target.closest('.profile-avatar')) {
            return;
        }
        userMenu.style.display = userMenu.style.display === 'none' ? 'block' : 'none';
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.user-menu') && !e.target.closest('.nav-buttons')) {
            userMenu.style.display = 'none';
        }
    });

    // Monetization link
    document.getElementById('monetizeLink')?.addEventListener('click', (e) => {
        e.stopPropagation();
        userMenu.style.display = 'none';
        openMonetizeModal();
    });

    // Owner Portal link
    document.getElementById('ownerPortalLink')?.addEventListener('click', (e) => {
        e.stopPropagation();
        userMenu.style.display = 'none';
        openOwnerPortal();
    });

    // Logout
    document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        userMenu.style.display = 'none';
        logout();
    });
}

// Login functionality
let isLoggedIn = false;
let userCoins = 0;
let userGifts = 0;
let userEarnings = 0;

function loadUserBalances() {
    try {
        userCoins = parseInt(localStorage.getItem('user_coins') || '0', 10);
        userGifts = parseInt(localStorage.getItem('user_gifts') || '0', 10);
        userEarnings = parseFloat(localStorage.getItem('user_earnings') || '0');
    } catch (e) {
        userCoins = 0; userGifts = 0; userEarnings = 0;
    }
}

function saveUserBalances() {
    localStorage.setItem('user_coins', String(userCoins));
    localStorage.setItem('user_gifts', String(userGifts));
    localStorage.setItem('user_earnings', String(userEarnings));
    updateBalanceDisplay();
}

function updateBalanceDisplay() {
    const balanceDisplay = document.getElementById('balanceDisplay');
    const coinCount = document.getElementById('coinCount');
    if (balanceDisplay && coinCount) {
        if (isLoggedIn) {
            balanceDisplay.style.display = 'flex';
            coinCount.textContent = formatNumber(userCoins);
        } else {
            balanceDisplay.style.display = 'none';
        }
    }
}

// load balances at start
loadUserBalances();

// Global gift catalog
const giftsCatalog = [
    { id: 'rose', name: 'Rose', emoji: '🌹', value: 1 },
    { id: 'heart', name: 'Heart', emoji: '❤️', value: 5 },
    { id: 'diamond', name: 'Diamond', emoji: '💎', value: 10 },
    { id: 'fire', name: 'Fire', emoji: '🔥', value: 25 },
    { id: 'crown', name: 'Crown', emoji: '👑', value: 50 }
];

function openLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            login();
        });
    }

    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal').style.display = 'none';
        });
    });

    // Modal background click to close
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Sign up link
    const signupLink = document.getElementById('signupLink');
    if (signupLink) {
        signupLink.addEventListener('click', () => {
            showNotification('Sign up feature coming soon! 🎉');
        });
    }

    // Forgot password link
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', () => {
            closeModal('loginModal');
            openModal('forgotPasswordModal');
        });
    }

    // Back to login link
    const backToLoginLink = document.getElementById('backToLoginLink');
    if (backToLoginLink) {
        backToLoginLink.addEventListener('click', () => {
            resetForgotPasswordModal();
            closeModal('forgotPasswordModal');
            openModal('loginModal');
        });
    }

    // Forgot password form submission - Step 1: Send OTP
    let generatedOtp = null;
    let forgotPasswordEmail = null;

    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('forgotEmail').value.trim();
            if (email) {
                // Generate 6-digit OTP
                generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
                forgotPasswordEmail = email;
                
                // Show notification with OTP (demo purposes)
                showNotification(`OTP sent to ${email}\nDemo OTP: ${generatedOtp}`);
                
                // Hide email form, show OTP form
                document.getElementById('forgotPasswordForm').style.display = 'none';
                document.getElementById('otpVerificationForm').style.display = 'flex';
                document.getElementById('otpEmailDisplay').textContent = `Code sent to ${email}`;
                document.getElementById('otpInput').focus();
            }
        });
    }

    // OTP Verification - Step 2: Verify OTP
    const verifyOtpBtn = document.getElementById('verifyOtpBtn');
    if (verifyOtpBtn) {
        verifyOtpBtn.addEventListener('click', () => {
            const enteredOtp = document.getElementById('otpInput').value.trim();
            if (enteredOtp === generatedOtp) {
                showNotification('✓ Code verified! Set your new password.');
                // Hide OTP form, show password reset form
                document.getElementById('otpVerificationForm').style.display = 'none';
                document.getElementById('newPasswordForm').style.display = 'flex';
                document.getElementById('newPassword').focus();
            } else {
                showNotification('❌ Invalid code. Please try again.');
                document.getElementById('otpInput').value = '';
            }
        });
    }

    // Resend OTP
    const resendOtpLink = document.getElementById('resendOtpLink');
    if (resendOtpLink) {
        resendOtpLink.addEventListener('click', () => {
            generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
            showNotification(`New OTP sent to ${forgotPasswordEmail}\nDemo OTP: ${generatedOtp}`);
            document.getElementById('otpInput').value = '';
            document.getElementById('otpInput').focus();
        });
    }

    // Reset Password - Step 3: Set new password
    const resetPasswordBtn = document.getElementById('resetPasswordBtn');
    if (resetPasswordBtn) {
        resetPasswordBtn.addEventListener('click', () => {
            const newPassword = document.getElementById('newPassword').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value.trim();
            
            if (!newPassword || !confirmPassword) {
                showNotification('Please fill in all fields.');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                showNotification('Passwords do not match.');
                return;
            }
            
            if (newPassword.length < 6) {
                showNotification('Password must be at least 6 characters.');
                return;
            }
            
            // Password reset successful
            showNotification('✓ Password reset successful! Please login.');
            
            // Reset all forms and return to login
            resetForgotPasswordModal();
            closeModal('forgotPasswordModal');
            openModal('loginModal');
        });
    }

    // Helper function to reset forgot password modal to initial state
    function resetForgotPasswordModal() {
        document.getElementById('forgotPasswordForm').style.display = 'flex';
        document.getElementById('otpVerificationForm').style.display = 'none';
        document.getElementById('newPasswordForm').style.display = 'none';
        document.getElementById('forgotEmail').value = '';
        document.getElementById('otpInput').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
        generatedOtp = null;
        forgotPasswordEmail = null;
    }

    // coin pack buttons
    document.querySelectorAll('.coin-pack').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const coins = parseInt(btn.dataset.coins, 10) || 0;
            purchaseCoins(coins);
        });
    });

    // Pay with M-Pesa STK Push
    const payWithMpesaBtn = document.getElementById('payWithMpesa');
    if (payWithMpesaBtn) {
        payWithMpesaBtn.addEventListener('click', async () => {
            const phone = document.getElementById('mpesaPhone').value.trim();
            if (!phone) return showNotification('Please enter a phone number');
            // simple fixed amount for demo or ask user to pick pack — we'll use 100 coins = $0.99 as demo
            const amount = 1; // M-Pesa amount in KES (demo). In real use convert coin price to KES.
            showNotification('Initiating M-Pesa payment (simulated or real)...');
            try {
                const resp = await fetch('/api/mpesa/stkpush', {
                    method: 'POST', headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({ amount, phone, accountReference: 'TiktokDemo', description: 'Buy coins' })
                });
                const data = await resp.json();
                if (data.simulated) {
                    // If simulated, give coins immediately for demo
                    purchaseCoins(100);
                }
                showNotification('STK Push request sent. Check your phone.');
            } catch (err) {
                showNotification('Payment failed to initiate.');
            }
        });
    }

    // Go Live form
    document.getElementById('startLiveBtn')?.addEventListener('click', startLiveStream);
    document.getElementById('endLiveBtn')?.addEventListener('click', endLiveStream);
    document.getElementById('sendLiveMessage')?.addEventListener('click', sendLiveMessage);

    // Withdraw button
    document.querySelector('.btn-withdraw')?.addEventListener('click', () => {
        showNotification('Payout requested! Check your email for details. 💰');
    });
});

function login() {
    const email = document.querySelector('#loginForm input[type="email"]').value;
    const password = document.querySelector('#loginForm input[type="password"]').value;

    if (email && password) {
        isLoggedIn = true;
        closeModal('loginModal');
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('userMenu').style.display = 'block';
        // show monetize and global orientation buttons in header
        const monetizeBtn = document.getElementById('monetizeBtn');
        if (monetizeBtn) monetizeBtn.style.display = 'inline-block';
        const globalOrientationBtn = document.getElementById('globalOrientationBtn');
        if (globalOrientationBtn) globalOrientationBtn.style.display = 'inline-block';
        updateBalanceDisplay();
        showNotification('Welcome! You are now logged in. 🎉');
        document.querySelector('#loginForm input[type="email"]').value = '';
        document.querySelector('#loginForm input[type="password"]').value = '';
    }
}

function logout() {
    isLoggedIn = false;
    document.getElementById('loginBtn').style.display = 'block';
    document.getElementById('userMenu').style.display = 'none';
    const monetizeBtn = document.getElementById('monetizeBtn');
    if (monetizeBtn) monetizeBtn.style.display = 'none';
    const globalOrientationBtn = document.getElementById('globalOrientationBtn');
    if (globalOrientationBtn) globalOrientationBtn.style.display = 'none';
    updateBalanceDisplay();
    showNotification('You have been logged out.');
    showNotification('You have been logged out. 👋');
}

// Go Live functionality
function openGoLiveModal() {
    if (!isLoggedIn) {
        showNotification('Please login first to go live! 🔐');
        openLoginModal();
        return;
    }
    document.getElementById('goLiveModal').style.display = 'flex';
    requestCameraAccess();
}

function requestCameraAccess() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            const videoElement = document.getElementById('livePreview');
            videoElement.srcObject = stream;
            videoElement.play();
        })
        .catch(err => {
            showNotification('Camera access denied. Please enable camera permissions. 📷');
        });
}

function startLiveStream() {
    const title = document.getElementById('liveTitle').value;
    const hashtag = document.getElementById('liveHashtag').value;

    if (!title.trim()) {
        showNotification('Please add a title for your live stream! 📝');
        return;
    }

    closeModal('goLiveModal');
    document.getElementById('activeLiveModal').style.display = 'flex';

    const activeVideo = document.getElementById('activeVideo');
    const livePreview = document.getElementById('livePreview');
    activeVideo.srcObject = livePreview.srcObject;
    activeVideo.play();

    showNotification(`${title} - Now LIVE! 🔴`);

    // Simulate live viewers
    let viewerCount = Math.floor(Math.random() * 50) + 10;
    let hearts = 0;

    const viewerInterval = setInterval(() => {
        viewerCount += Math.floor(Math.random() * 5) - 2;
        if (viewerCount < 0) viewerCount = 0;
        document.getElementById('viewerCount').textContent = viewerCount;
    }, 2000);

    document.getElementById('endLiveBtn').addEventListener('click', () => {
        clearInterval(viewerInterval);
        endLiveStream();
    }, { once: true });

    // Simulate chat messages
    const sampleMessages = [
        { name: 'Alex', message: 'Amazing content! 🔥' },
        { name: 'Sarah', message: 'Love this! 💕' },
        { name: 'Mike', message: 'Keep it up!' },
        { name: 'Emma', message: 'So talented! 🎉' },
        { name: 'John', message: '👍👍👍' }
    ];

    setInterval(() => {
        const randomMsg = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
        addLiveComment(randomMsg.name, randomMsg.message);
    }, 3000);
}

function addLiveComment(name, message) {
    const commentsContainer = document.getElementById('liveComments');
    const commentDiv = document.createElement('div');
    commentDiv.className = 'live-comment';
    commentDiv.innerHTML = `<span class="live-comment-name">${name}:</span> ${message}`;
    commentsContainer.appendChild(commentDiv);
    commentsContainer.scrollTop = commentsContainer.scrollHeight;

    if (commentsContainer.children.length > 10) {
        commentsContainer.removeChild(commentsContainer.firstChild);
    }
}

function sendLiveMessage() {
    const input = document.getElementById('liveMessage');
    const message = input.value;

    if (message.trim()) {
        addLiveComment('You', message);
        input.value = '';
        
        // Earn hearts for sending messages
        userCoins += 5;
        document.getElementById('liveHearts').textContent = 
            parseInt(document.getElementById('liveHearts').textContent) + 1;
    }
}

function endLiveStream() {
    closeModal('activeLiveModal');
    const title = document.getElementById('liveTitle').value;
    userGifts += Math.floor(Math.random() * 20) + 5;
    userEarnings += Math.random() * 50;
    userCoins += 100;
    showNotification(`Live stream ended! You earned ${Math.floor(userEarnings)} coins! 💰`);
    document.getElementById('liveTitle').value = '';
    document.getElementById('liveHashtag').value = '';
}

// Monetization
function openMonetizeModal() {
    if (!isLoggedIn) {
        showNotification('Please login to access monetization! 🔐');
        openLoginModal();
        return;
    }
    document.getElementById('monetizeModal').style.display = 'flex';
    updateMonetizeStats();
}

function updateMonetizeStats() {
    document.getElementById('totalCoins').textContent = userCoins;
    document.getElementById('totalGifts').textContent = userGifts;
    document.getElementById('pendingEarnings').textContent = '$' + (userEarnings * 0.5).toFixed(2);
    document.getElementById('totalEarnings').textContent = '$' + (userEarnings * 0.7).toFixed(2);

    const giftsList = document.getElementById('giftsList');
    giftsList.innerHTML = '';

    const gifts = [
        { name: 'Rose', emoji: '🌹', value: 1 },
        { name: 'Diamond', emoji: '💎', value: 10 },
        { name: 'Heart', emoji: '❤️', value: 5 },
        { name: 'Fire', emoji: '🔥', value: 25 },
        { name: 'Crown', emoji: '👑', value: 50 },
        { name: 'Moon', emoji: '🌙', value: 15 }
    ];

    gifts.forEach(gift => {
        const giftEl = document.createElement('div');
        giftEl.className = 'gift-item';
        giftEl.innerHTML = `
            <div class="gift-emoji">${gift.emoji}</div>
            <div class="gift-name">${gift.name}</div>
            <div class="gift-value">${gift.value} coins</div>
        `;
        giftsList.appendChild(giftEl);
    });
}

// Open Buy Coins modal
function openBuyCoinsModal() {
    document.getElementById('buyCoinsModal').style.display = 'flex';
}

// Simulate purchase (demo)
function purchaseCoins(amount) {
    // In a real app you'd call a payments API. Here we simulate success.
    userCoins += amount;
    saveUserBalances();
    updateMonetizeStats();
    showNotification(`Purchase successful — you received ${amount} coins! 🎉`);
    closeModal('buyCoinsModal');
}

// Open gift picker for a target (video or live)
let giftTarget = null; // { type: 'video'|'live', id }
function openGiftPicker(target) {
    giftTarget = target;
    const container = document.getElementById('giftOptions');
    container.innerHTML = '';
    giftsCatalog.forEach(g => {
        const el = document.createElement('div');
        el.className = 'gift-item';
        el.dataset.giftId = g.id;
        el.innerHTML = `<div class="gift-emoji">${g.emoji}</div><div class="gift-name">${g.name}</div><div class="gift-cost">${g.value} coins</div>`;
        el.addEventListener('click', () => {
            container.querySelectorAll('.gift-item').forEach(x=>x.classList.remove('selected'));
            el.classList.add('selected');
            // attempt send immediately
            sendGift(g.id);
        });
        container.appendChild(el);
    });
    document.getElementById('giftPickerModal').style.display = 'flex';
}

function sendGift(giftId) {
    const gift = giftsCatalog.find(g => g.id === giftId);
    if (!gift) return;
    if (userCoins < gift.value) {
        showNotification('Not enough coins — please buy more.');
        return;
    }
    userCoins -= gift.value;
    userGifts += 1;
    userEarnings += gift.value * 0.1; // demo conversion
    saveUserBalances();
    updateMonetizeStats();
    showNotification(`Sent ${gift.name} ${gift.emoji} — ${gift.value} coins`);

    // Close gift picker
    closeModal('giftPickerModal');

    // Optionally show gift animation on target
    if (giftTarget && giftTarget.type === 'video') {
        // briefly show floating emoji on card
        const feed = document.querySelector('.feed-container');
        const card = feed.children[giftTarget.index];
        if (card) {
            const anim = document.createElement('div');
            anim.textContent = gift.emoji;
            anim.style.cssText = 'position:absolute; left:50%; top:30%; transform:translate(-50%,-50%); font-size:48px; z-index:999; opacity:1;';
            card.appendChild(anim);
            setTimeout(()=> anim.remove(), 1200);
        }
    }
}

// Owner Portal
let creatorStats = {
    totalVideos: 42,
    totalViews: 1250000,
    totalLikes: 125000,
    totalFollowers: 15500,
    engagementRate: 8.5,
    avgWatchTime: 45,
    completionRate: 72,
    topVideoViews: 85000
};

function openOwnerPortal() {
    if (!isLoggedIn) {
        showNotification('Please login first! 🔐');
        openLoginModal();
        return;
    }
    document.getElementById('ownerPortalModal').style.display = 'flex';
    initPortalTabs();
    loadPortalData();
}

function initPortalTabs() {
    const navItems = document.querySelectorAll('.portal-nav-item');
    const tabs = document.querySelectorAll('.portal-tab');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(n => n.classList.remove('active'));
            tabs.forEach(t => t.classList.remove('active'));
            
            item.classList.add('active');
            const tabId = item.dataset.tab + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });
}

function loadPortalData() {
    // Dashboard stats
    document.getElementById('totalVideos').textContent = creatorStats.totalVideos;
    document.getElementById('totalViews').textContent = formatNumber(creatorStats.totalViews);
    document.getElementById('totalLikes').textContent = formatNumber(creatorStats.totalLikes);
    document.getElementById('totalFollowers').textContent = formatNumber(creatorStats.totalFollowers);

    // Analytics
    document.getElementById('engagementRate').textContent = creatorStats.engagementRate + '%';
    document.getElementById('avgWatchTime').textContent = creatorStats.avgWatchTime + 's';
    document.getElementById('completionRate').textContent = creatorStats.completionRate + '%';
    document.getElementById('topVideoViews').textContent = formatNumber(creatorStats.topVideoViews);

    // Load content
    loadMyContent();

    // Settings
    setupSettingsForm();
}

function loadMyContent() {
    const contentList = document.getElementById('contentList');
    contentList.innerHTML = '';

    const contentItems = [
        { title: 'Amazing Dance Move', duration: '0:32', views: 125000, likes: 12500 },
        { title: 'Morning Vibe', duration: '0:45', views: 98000, likes: 9800 },
        { title: 'Tutorial Time', duration: '2:15', views: 75000, likes: 7500 },
        { title: 'Sunset Moment', duration: '0:58', views: 62000, likes: 6200 },
        { title: 'Challenge #1', duration: '0:38', views: 450000, likes: 45000 },
        { title: 'Collab Video', duration: '1:20', views: 380000, likes: 38000 }
    ];

    contentItems.forEach(item => {
        const contentEl = document.createElement('div');
        contentEl.className = 'content-item';
        contentEl.innerHTML = `
            <div class="content-thumbnail">
                <video></video>
                <div class="content-duration">${item.duration}</div>
            </div>
            <div class="content-info">
                <div class="content-title">${item.title}</div>
                <div class="content-stats">
                    <span><i class="fas fa-eye"></i> ${formatNumber(item.views)}</span>
                    <span><i class="fas fa-heart"></i> ${formatNumber(item.likes)}</span>
                </div>
            </div>
        `;
        contentList.appendChild(contentEl);
    });
}

function setupSettingsForm() {
    const saveBtn = document.querySelector('.btn-save-settings');
    const cancelBtn = document.querySelector('.btn-cancel-settings');

    saveBtn.addEventListener('click', () => {
        showNotification('Channel settings saved successfully! ✅');
    });

    cancelBtn.addEventListener('click', () => {
        showNotification('Changes discarded');
    });
}

// Profile modal
function openProfileModal() {
    if (!isLoggedIn) {
        showNotification('Please login to view profile.');
        openLoginModal();
        return;
    }
    // load current user profile from storage
    const profile = loadUserProfile();
    document.getElementById('profileName').textContent = profile.name || 'John Doe';
    document.getElementById('profileHandle').textContent = profile.handle ? `@${profile.handle}` : '@you';
    document.getElementById('profileBio').textContent = profile.bio || 'Add a bio to your profile.';
    const avatarEl = document.getElementById('profileAvatar');
    if (avatarEl) avatarEl.style.backgroundImage = profile.avatar ? `url('${profile.avatar}')` : "url('https://i.pravatar.cc/150?img=1')";

    // show edit button for own profile and hide follow button
    const editBtn = document.getElementById('editProfileBtn');
    const followBtn = document.getElementById('profileFollowBtn');
    if (editBtn) editBtn.style.display = 'inline-block';
    if (followBtn) followBtn.style.display = 'none';

    // stats from creatorStats and storage
    document.getElementById('profileVideosCount').textContent = creatorStats ? creatorStats.totalVideos : videos.length;
    // followers come from storage (pre-populated demo) or creatorStats
    const followers = getFollowers();
    document.getElementById('profileFollowers').textContent = followers.length ? formatNumber(followers.length) : (creatorStats ? formatNumber(creatorStats.totalFollowers) : '0');
    const following = getFollowing();
    document.getElementById('profileFollowing').textContent = following.length ? formatNumber(following.length) : '0';

    // populate recent videos (show thumbnails)
    const list = document.getElementById('profileVideos');
    list.innerHTML = '';
    videos.slice(0,6).forEach(v => {
        const item = document.createElement('div');
        item.className = 'profile-video-item';
        item.innerHTML = `<div style="background:#000; height:100px; display:flex; align-items:center; justify-content:center;"><video src="${v.videoUrl}" class="profile-video-thumb" muted></video></div>`;
        item.addEventListener('click', () => {
            // jump to that video by scrolling feed and highlighting
            const idx = videos.findIndex(x => x.id === v.id);
            const feed = document.querySelector('.feed-container');
            const card = feed.children[idx];
            if (card) card.scrollIntoView({behavior: 'smooth', block: 'center'});
        });
        list.appendChild(item);
    });

    document.getElementById('profileModal').style.display = 'flex';
}

// Profile tabs switching
function initProfileTabs() {
    const tabButtons = document.querySelectorAll('.profile-tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // hide all sections
            document.querySelectorAll('.profile-tab-section').forEach(s => s.classList.remove('active'));
            const id = 'section-' + btn.dataset.section;
            const sec = document.getElementById(id);
            if (sec) sec.classList.add('active');
        });
    });

    // populate default content for a few sections
    const assets = document.getElementById('section-assets');
    if (assets) {
        assets.innerHTML = `
            <h4>Your Assets</h4>
            <p>Coins: <strong>${userCoins || 0}</strong> &nbsp;|&nbsp; Gifts: <strong>${userGifts || 0}</strong></p>
            <p style="color:#999">Saved images, sounds and branded assets will appear here (demo).</p>
        `;
    }

    const qr = document.getElementById('section-qr');
    if (qr) {
        qr.innerHTML = `
            <h4>QR Code</h4>
            <p>Generate a QR code for your profile:</p>
            <div style="margin-top:10px;"><button id="genQrBtn" class="btn-modal-login">Generate QR</button></div>
            <div id="qrCanvas" style="margin-top:12px;"></div>
        `;

        // simple QR placeholder generation (data URL) when clicked
        setTimeout(() => {
            const gen = document.getElementById('genQrBtn');
            gen?.addEventListener('click', () => {
                const profile = loadUserProfile();
                const data = `https://demo.app/user/${profile.handle || 'you'}`;
                // create a simple QR placeholder square using canvas
                const canvas = document.createElement('canvas');
                canvas.width = 160; canvas.height = 160;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#0b0b0b'; ctx.fillRect(0,0,160,160);
                ctx.fillStyle = '#25f4ee';
                for (let i=0;i<160;i+=8) for (let j=0;j<160;j+=8) if (Math.random()>0.7) ctx.fillRect(i,j,6,6);
                const holder = document.getElementById('qrCanvas');
                holder.innerHTML = '';
                holder.appendChild(canvas);
            });
        }, 0);
    }

    const offline = document.getElementById('section-offline');
    if (offline) {
        offline.innerHTML = `<h4>Offline Videos</h4><p style="color:#999">No offline videos saved (demo).</p>`;
    }
}

// initialize tabs when DOM ready and when opening profile
document.addEventListener('DOMContentLoaded', () => {
    initProfileTabs();
});

// User profile storage helpers
function loadUserProfile() {
    try {
        const raw = localStorage.getItem('app_user_profile');
        if (raw) return JSON.parse(raw);
    } catch (e) {}
    // defaults
    return {
        name: 'You',
        handle: 'you',
        avatar: 'https://i.pravatar.cc/150?img=1',
        bio: 'This is your profile. Edit to add details.'
    };
}

function saveUserProfile(profile) {
    localStorage.setItem('app_user_profile', JSON.stringify(profile));
}

// Edit profile wiring
document.addEventListener('DOMContentLoaded', () => {
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editForm = document.getElementById('editProfileForm');
    const cancelEdit = document.getElementById('cancelEditProfile');
    const saveEdit = document.getElementById('saveEditProfile');
    const avatarFile = document.getElementById('editAvatarFile');

    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            const profile = loadUserProfile();
            document.getElementById('editName').value = profile.name || '';
            document.getElementById('editHandle').value = profile.handle || '';
            document.getElementById('editAvatarUrl').value = profile.avatar || '';
            document.getElementById('editBio').value = profile.bio || '';
            editForm.style.display = 'block';
        });
    }

    if (cancelEdit) {
        cancelEdit.addEventListener('click', () => {
            editForm.style.display = 'none';
        });
    }

    if (saveEdit) {
        saveEdit.addEventListener('click', () => {
            const name = document.getElementById('editName').value.trim();
            const handle = document.getElementById('editHandle').value.trim();
            const avatarUrl = document.getElementById('editAvatarUrl').value.trim();
            const bio = document.getElementById('editBio').value.trim();

            let avatar = avatarUrl || null;
            if (avatarFile && avatarFile.files && avatarFile.files[0]) {
                avatar = URL.createObjectURL(avatarFile.files[0]);
            }

            const profile = { name: name || 'You', handle: handle || 'you', avatar: avatar || 'https://i.pravatar.cc/150?img=1', bio };
            saveUserProfile(profile);
            // update UI
            document.getElementById('profileName').textContent = profile.name;
            document.getElementById('profileHandle').textContent = `@${profile.handle}`;
            document.getElementById('profileBio').textContent = profile.bio;
            const avatarEl2 = document.getElementById('profileAvatar');
            if (avatarEl2) avatarEl2.style.backgroundImage = `url('${profile.avatar}')`;
            showNotification('Profile updated.');
            editForm.style.display = 'none';
        });
    }
});

function showProfileList(type) {
    const panel = document.getElementById('profileListPanel');
    const title = document.getElementById('profileListTitle');
    const container = document.getElementById('profileListItems');
    container.innerHTML = '';
    panel.style.display = 'block';

    if (type === 'followers') {
        title.textContent = 'Followers';
        const list = getFollowers();
        if (!list.length) container.innerHTML = '<div style="color:#999">No followers yet</div>';
        list.forEach(u => {
            const el = document.createElement('div');
            el.className = 'profile-list-item';
            el.innerHTML = `<div class="profile-list-avatar" style="background-image:url('https://i.pravatar.cc/150?u=${u}');"></div><div style="flex:1"><div class="profile-list-name">${u}</div><div class="profile-list-handle">@${u}</div></div><div><button class="follow-btn small" data-user="${u}">Follow</button></div>`;
            container.appendChild(el);
        });
    } else {
        title.textContent = 'Following';
        const list = getFollowing();
        if (!list.length) container.innerHTML = '<div style="color:#999">You are not following anyone</div>';
        list.forEach(u => {
            const el = document.createElement('div');
            el.className = 'profile-list-item';
            el.innerHTML = `<div class="profile-list-avatar" style="background-image:url('https://i.pravatar.cc/150?u=${u}');"></div><div style="flex:1"><div class="profile-list-name">${u}</div><div class="profile-list-handle">@${u}</div></div><div><button class="follow-btn small following" data-user="${u}">Following</button></div>`;
            container.appendChild(el);
        });
    }

    // attach follow/unfollow handlers in the list
    container.querySelectorAll('.follow-btn').forEach(b => {
        b.addEventListener('click', (e) => {
            const u = e.currentTarget.dataset.user;
            // find any follow buttons in feed and update
            document.querySelectorAll('.follow-btn').forEach(fb => {
                if (fb.dataset.videoId == null && fb.dataset.user !== u) return;
            });
            // toggle via storage
            const following = getFollowing();
            if (following.includes(u)) {
                setFollowing(following.filter(x => x !== u));
                e.currentTarget.classList.remove('following');
                e.currentTarget.textContent = 'Follow';
            } else {
                following.push(u);
                setFollowing(following);
                e.currentTarget.classList.add('following');
                e.currentTarget.textContent = 'Following';
            }
            document.getElementById('profileFollowing').textContent = formatNumber(getFollowing().length);
        });
    });
}

// Wire profile link
document.addEventListener('DOMContentLoaded', () => {
    const profileLink = document.getElementById('profileLink');
    if (profileLink) profileLink.addEventListener('click', openProfileModal);

    // profile follow button behavior
    document.getElementById('profileFollowBtn')?.addEventListener('click', (e) => {
        const btn = e.currentTarget;
        btn.classList.toggle('following');
        btn.textContent = btn.classList.contains('following') ? 'Following' : 'Follow';
        showNotification(btn.classList.contains('following') ? 'You followed this user' : 'Unfollowed');
    });
    
    // initialize follower/following storage if missing (demo sample)
    if (!localStorage.getItem('app_followers')) {
        const sampleFollowers = ['alex', 'sarah', 'mike', 'emma'];
        setFollowers(sampleFollowers);
    }
    if (!localStorage.getItem('app_following')) {
        const sampleFollowing = [];
        setFollowing(sampleFollowing);
    }

    // show list panels controls
    document.getElementById('openFollowers')?.addEventListener('click', () => showProfileList('followers'));
    document.getElementById('openFollowing')?.addEventListener('click', () => showProfileList('following'));
    document.getElementById('closeProfileList')?.addEventListener('click', () => {
        document.getElementById('profileListPanel').style.display = 'none';
    });
});
const chatForm = document.querySelector('.chat-input');
const chatInput = document.querySelector('#messageInput');
const chatMessagesContainer = document.querySelector('.chat-messages');
let player;
let isYouTubeAPIReady = false;

class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(elem) {
        this.items.push(elem);
    }

    dequeue() {
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    print() {
        if (!this.isEmpty()) {
            return this.items;
        }
    }
}

let queue = new Queue();

const loadYouTubeAPI = () => {
    return new Promise((resolve) => {
        if (!document.querySelector('#yt-player')) {
            const tag = document.createElement('script');
            tag.id = 'yt-player';
            tag.src = 'https://www.youtube.com/iframe_api';
            document.head.appendChild(tag);
            window.onYouTubeIframeAPIReady = () => {
                isYouTubeAPIReady = true;
                resolve();
            };
        } else {
            if (isYouTubeAPIReady) {
                resolve();
            } else {
                window.onYouTubeIframeAPIReady = () => {
                    isYouTubeAPIReady = true;
                    resolve();
                };
            }
        }
    });
}

const createSong = async (link) => {
    await loadYouTubeAPI();

    const videoId = extractVideoId(link);
    if (player) {
        player.loadVideoById(videoId);
    } else {
        player = new YT.Player('player', {
            height: '0',
            width: '0',
            videoId: videoId,
            playerVars: {
                'autoplay': 1,
                'controls': 0,
                'rel': 0,
                'showinfo': 0,
                'loop': 0
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
}

const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);

    return match ? match[1] : null;
}

const onPlayerReady = (event) => {
    event.target.playVideo();
}

const onPlayerStateChange = (event) => {
    if (event.data === YT.PlayerState.ENDED) {
        if (!queue.isEmpty()) {
            const nextSong = queue.dequeue();
            createSong(nextSong);
        }
    }
}

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const inputValue = chatInput.value.trim();

    if (inputValue !== '') {
        writeMessage('User1', inputValue);
    }

    if (inputValue.includes('!skip')) {
        if (!queue.isEmpty()) {
            const nextSong = queue.dequeue();
            await createSong(nextSong);

            writeMessage('streamElements', 'Song skipped');
        } else {
            writeMessage('streamElements', 'Nothing to skip');
        }
    }

    if (inputValue.includes('!sr')) {
        const match = inputValue.match(/https:\/\/www\.youtube\.com/);

        if (match) {
            const link = inputValue.split(' ')[1];
            queue.enqueue(link);
            writeMessage('streamElements', 'Song added to the queue');

            if (!player || player.getPlayerState() === YT.PlayerState.ENDED || player.getPlayerState() === YT.PlayerState.UNSTARTED) {
                const nextSong = queue.dequeue();
                await createSong(nextSong);
            }
        } else {
            writeMessage('streamElements', 'Link not valid.');
        }
    }
});

const writeMessage = (user, message) => {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';

    const spanUsername = document.createElement('span');
    spanUsername.className = 'username';
    spanUsername.innerText = user;
    messageDiv.append(spanUsername);

    const spanMessage = document.createElement('span');
    spanMessage.className = 'text';
    spanMessage.innerText = message;
    messageDiv.append(spanMessage);

    chatMessagesContainer.append(messageDiv);
}

const playerContainer = document.createElement('div');
playerContainer.id = 'player';
document.body.appendChild(playerContainer);

async function fetchDiscordStatus() {
    const statusElement = document.getElementById('status');
    const statusMap = {
        online: 'Online',
        idle: 'Idle',
        dnd: 'Do Not Disturb',
        offline: 'Offline'
    };

    try {
        const res = await fetch('https://api.lanyard.rest/v1/users/1154585783529910292');
        const json = await res.json();
        const status = json.data.discord_status;

        if (statusElement && statusMap[status]) {
            statusElement.textContent = `Status: ${statusMap[status]}`;
        } else {
            statusElement.textContent = 'Status: Unknown';
        }
    } catch (err) {
        console.error('[lanyard fetch error]:', err);
        if (statusElement)
            statusElement.textContent = 'Status: Failed to load';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchDiscordStatus();
});
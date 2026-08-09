const API_BASE_URL = 'https://timeout-appeals.discloud.app/api';
const API_KEY = 'P16yie33Q2110pE-5bMAahtL2CmpK6Q-Abc123!XyZ987@';

async function sendAPI(endpoint, method = 'GET', body = null) {
    try {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            }
        };
        if (body) options.body = JSON.stringify(body);
        const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
        return await res.json();
    } catch (err) {
        console.error('خطأ:', err);
        alert('تعذر الاتصال بالبوت! تأكد من الرابط والمفتاح.');
    }
}

async function loadSettings() {
    return await sendAPI('/settings');
}

async function saveSettings(settings) {
    return await sendAPI('/update-settings', 'POST', settings);
}

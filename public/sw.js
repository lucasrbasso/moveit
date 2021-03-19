/* eslint-disable no-undef */
self.addEventListener('install', event => {
    console.log('Hello world from the Service Worker 🤙');
});

self.addEventListener('notificationclick', event => {
    event.notification.close();

    event.waitUntil(
        clients
            .matchAll({
                type: 'window',
            })
            .then(clientList => {
                for (let i = 0; i < clientList.length; i++) {
                    const client = clientList[i];
                    if (
                        client.url == 'https://moveit-nlw-psi.vercel.app/' &&
                        'focus' in client
                    ) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow('https://moveit-nlw-psi.vercel.app/');
                }
            }),
    );
});

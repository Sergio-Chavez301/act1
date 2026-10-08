self.addEventListener('install', (event) => {
    //self.skipWaiting();
    event.waitUntil(
        caches.open('v2')
        .then((cache) => {
            cache.addAll([
                './',
                './script.js',
                './obj.png'
            ]);
            console.log('Assets cached');
        })
        .catch(err => console.log('could not cache.'))
    );
});

self.addEventListener('fetch', event => {
    console.log("INTERCEPTED");

    event.respondWith(
        caches.match(event.request)
        .then(response => {
            console.log("v2 The Request: ", event.request);
            console.log("v2 The response... ", response);

            return response || fetch(event.request);

            //if (event.response.url === 'http://127.0.0.0:5500/act1/openEditors/obj.png') {
            //    return fetch('http://picsum.photos/800');
            //} else {
            //    return response;
            //}

            //if (event.request.url === 'http://127.0.0.0:5500/act1/openEditors/obj.png') {
            //    return fetch('http://picsum.photos/800')
            //    .then(res => {
            //        return caches.open('v1').then(cache => {
            //            cache.put(event.request, res.clone());
            //            return res;
            //        })
            //    });
            //} else {
            //    return response;
            //}

            // if (event.request.url === 'http://127.0.0.0:5500/act1/openEditors/obj.png') {
               // return fetch('http://picsum.photos/800')
                // .then(res => {
                   // return caches.open('v1').then(cache => {
                        //cache.put(event.request, res.clone());
                        //return res;
                    //})
                //});
            //} else {
              //  return response;
            //}

            //return fetch('http://jsonplaceholder.typicode.com/todos/1')

            //return response('');
            
        })
        .catch(err => {
            console.log('could not find maching request.');
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
        .then(keys => {
            keys.forEach(key => {
                if (key !== 'v1') caches.delete(key);
            });
        })
    );
});
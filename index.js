$(document).ready(function() {
    const kubernetes_url = "https://kubernetes.io/feed.xml";
    const percona = "https://www.percona.com/blog/feed/";

    let url = "http://localhost:3000/get_rss";
    let main_url = "https://github-pages-api.uc.r.appspot.com/get_rss";

    let load_items = function(items) {
        items.forEach(item => {
            // console.log(item);
            let item_row = document.createElement("div")
            item_row.className = "item-row"
            let description = document.createElement("div")
            description.className = "item-description";
            description.innerText = item.title;

            let link = document.createElement("a");
            link.href = item.link;
            link.innerText = item.title;
            item_row.appendChild(link)
            $('.feed-view').append(item_row);
        })
    }

    $("#kubernetes").click(function() {
        $('.feed-view').empty();
        fetch(`${main_url}/kubernetes`, {method: 'GET', headers: {"accept": "application/json"}})
        .then(response => {
            response.json().then(data => {
                // console.log(data.data.rss.channel.item);
                let items = data.data.rss.channel.item;
                // console.log(items);
                load_items(items)
            })
        })
    })

    $("#percona").click(function() {
        $('.feed-view').empty();
        fetch(`${main_url}/percona`, {method: 'GET', headers: {"accept": "application/json"}})
        .then(response => {
            response.json().then(data => {
                // console.log(data.data.rss.channel.item);
                let items = data.data.rss.channel.item;
                // console.log(items);
                load_items(items)
            })
        })
    })

    $("#tinybird").click(function() {
        $('.feed-view').empty();
        fetch(`${main_url}/tinybird`, {method: 'GET', headers: {"accept": "application/json"}})
        .then(response => {
            response.json().then(data => {
                // console.log(data.data.rss.channel.item);
                let items = data.data.rss.channel.item;
                // console.log(items);
                load_items(items);
            })
        })
    })

    // $("#altinity").click(function() {
    //     $('.feed-view').empty();
    //     fetch(`${main_url}/altinity`, {method: 'GET', headers: {"accept": "application/json"}})
    //         .then(response => {
    //             response.json().then(data => {
    //                 // console.log(data.data.rss.channel.item);
    //                 let items = data.data.rss.channel.item;
    //                 items.forEach(item => {
    //                     console.log(item);
    //                     let item_row = document.createElement("div")
    //                     item_row.className = "item-row"
    //                     let description = document.createElement("div")
    //                     description.className = "item-description";
    //                     description.innerText = item.title;
    //                     item_row.appendChild(description)
    //                     $('.feed-view').append(item_row);
    //
    //                 })
    //             })
    //         })
    // })


    $('.nav-toggle').click(function(e) {
        $('.rss-nav').toggleClass('closed');
        $('.feed-view').toggleClass("closed")
        if ($('.nav-toggle i').hasClass('fa-chevron-left')) {
            $('.nav-toggle i').removeClass('fa-chevron-left');
            $('.nav-toggle i').addClass('fa-chevron-right');
        } else if ($('.nav-toggle i').hasClass('fa-chevron-right')) {
            $('.nav-toggle i').removeClass('fa-chevron-right');
            $('.nav-toggle i').addClass('fa-chevron-left');
        }
    })

    document.getElementById("kubernetes").click();

})



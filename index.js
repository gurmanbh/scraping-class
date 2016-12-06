// First define your node packages

var request = require('request')
var cheerio = require('cheerio')
var fs = require('fs')

var url = 'http://www.bollywoodhungama.com/movies/top-100-movies/'

var data = []

request(url, function(err, response, body){
    if (!err & response.statusCode == 200){
        var $ = cheerio.load(body);
        var $movies = $('.bh-top-100-movies-wrapper .hentry')

        $movies.each(function(index,movie){
            var obj = {}
            obj.rank = $(movie).find('.rank').text().trim()
            obj.movie_name = $(movie).find('.name').text().trim()
            obj.poll_count = $(movie).find('.bh-poll-view-count').text().trim()
            obj.rating = $(movie).find('.current-rating').attr('class').split('rating-')[1]/10
            data.push(obj)
        })

        fs.writeFileSync('data.json', JSON.stringify(data));
        
    } else {
        console.log('error. fetch incomplete.')
    }
})
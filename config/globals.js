/**
 * Created by Rutul Shah on 2017-03-21.
 */

// array of global variables
module.exports = {
    // db: 'mongodb://localhost/comp2068-w2017' // local mongodb
    db: 'mongodb://root:rutul@ds145669.mlab.com:45669/node',//mlab
    username: 'rutulshah17@gmailcom',
    password: '',
    facebook:{
        clientID: "1745876219057649",
        clientSecret: "482d7b447dbc337f56b20b6426bac658",
        callbackURL: "https://invoicescomp2068.herokuapp.com/facebook"
    },
    twitter:{
        consumerKey: "z9vIYOVpZB3LE7v8ReCVjjPat",
        consumerSecret: "IMfnZIx0iMALk1OL30uheQLizl5FC9HVBdRwYnLmn4NgG5qwLJ",
        callbackURL: "https://invoicescomp2068.herokuapp.com/twitter"
    }
};




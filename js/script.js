//ok


var csv_object;
var init_contact = new XMLHttpRequest();
var gist_list;
var user_name = atob("Z2Vla3dpc2Vy");
var gist;
var gist_read;
var csv_file;
var user;
var csv_content;
var user_database;
var input_username;
var input_password;
var token;
var github;

//---initial contact with github
init_contact.open('GET', atob("aHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS9nZWVrd2lzZXIvNDUxZWE0ZDFhMDYyYTRmMWEwZGEvcmF3LzBhYjk1ZmRmMzIzMDE4ZTYzYzk1ZDYxOGNhMjI2ODhjOTgxOTUyOWMvbmV3dGV4dC50eHQ="),false);

init_contact.send(null);

//-- authorization token generation 
token = init_contact.responseText;

token = atob(token);

//login to github via token
github = new Github({
    token:token,
    auth: "basic"
});

// creates user object
user = github.getUser();

// create a list of gist
user.userGists(user_name,function(err,res) {

    gist_list = res;

    gist = github.getGist(gist_list[0].id);

    //reads gist file 
    gist.read(function(err,res){

        gist_read = res;

        //gist_read.files['user_database.csv'].content = gist_read.files['user_database.csv'].content + '\n' + 'newuser,newemail,newpassword';
        csv_file = Object.keys(gist_read.files);

        csv_content= gist_read.files[csv_file].content;

        csv_object = csvJSON(csv_content);

        gist.update(gist_read,function(){

        });
//var csv is the CSV file with headers and converts csv file to json object
        function csvJSON(csv){

            var lines=csv.split("\n");

            var result = [];

            user_database={};

            var headers=lines[0].split(",");

            for(var i=1;i<lines.length;i++){

                var obj = {};

                var currentline=lines[i].split(",");

                for(var j=0;j<headers.length;j++){

                    obj[headers[j]] = currentline[j];

                    if(j===0){

                        var cust_id = currentline[j];

                    }
                }

                result.push(obj);

                user_database[cust_id] = obj;

            }

            //return result; //JavaScript object
            return JSON.stringify(result); //JSON
        }

        //login button operation 
        var button = document.getElementsByTagName('button');

        var login_button = button[0];

        input_username = document.getElementById('username');

        input_password = document.getElementById('password');

        login_button.addEventListener('click',function(){

            //-- runs check for username in database to login to site
            if (user_database.hasOwnProperty(input_username.value)){

                var verified_user = input_username.value;

                verified_user = user_database[verified_user];

                //cross refs the password in input to password of user in database
                if (verified_user.password === input_password.value){

                    alert('login successful');

                    window.location = "http://vinferno.github.io/o";

                }else{

                    alert('username and password do not match');

                }

            }else{

                alert('username not found');

            }

        });

        //----takes a person to the sign up page to register
        var sign_up_button = document.getElementById('sign_up');

        sign_up_button.addEventListener('click',function(){

            window.location = 'sign_up.html';

        });

    });

});
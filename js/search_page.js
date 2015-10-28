//ok


var mandrill_client;
var init_contact = new XMLHttpRequest();
var gist_list;
var user_name = atob("Z2Vla3dpc2Vy");
var gist;
var gist_read;
var user;
var csv_file;
var csv_object;
var csv_content;
var user_database;
var input_username;
var input_email;
var input_password;
var input_password_confirm;
var input;
var button;
var alert_all;
var alert_username;
var alert_email;
var alert_password;
var alert_password_match;
var alert_blank;
var github;
var result;
var token;

//initial contact to github to grab token 
init_contact.open('GET',atob("aHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS9nZWVrd2lzZXIvNDUxZWE0ZDFhMDYyYTRmMWEwZGEvcmF3LzBhYjk1ZmRmMzIzMDE4ZTYzYzk1ZDYxOGNhMjI2ODhjOTgxOTUyOWMvbmV3dGV4dC50eHQ="),false);

init_contact.send(null);

token = init_contact.responseText;

token = atob(token);

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

    gist.read(function(err,res){

        gist_read = res;

        csv_file = Object.keys(gist_read.files);

        csv_content= gist_read.files[csv_file].content;

        csv_object = csvJSON(csv_content);

//var csv is the CSV file with headers and function csvJSON converts csv to json object
        function csvJSON(csv){

            var lines=csv.split("\n");

            result = [];

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
    });
});
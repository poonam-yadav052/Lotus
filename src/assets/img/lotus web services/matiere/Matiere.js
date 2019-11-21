var db = require('../db');
var md5 = require('md5');
var Matiere = {
    getusers: function(Users,callback)
    {
        return db.query('SELECT lt_users.ID,loginName,userName,(select count(*) from lt_users as u where u.createdBy=lt_users.ID) as downline,"" as bettingStatus,status,"" as netexposure,take,give,(select creditLimit from lt_creditlimit where lt_creditlimit.userId=lt_users.ID ORDER by `lt_creditlimit`.`createdDate` DESC LIMIT 1) as creditLimit ,`sport` as posSport, lt_positiontaking.`cricket` as posCricket, lt_positiontaking.`football` as posFootball, lt_positiontaking.`tennis` as posTennis, lt_positiontaking.`horseRacing` as posHorseRacing, lt_positiontaking.`greyhoundRacing` as posGreyhoundRacing, lt_positiontaking.`casino` as posCasino,createdDate,(select loginDate from lt_userLoginHistory where lt_users.ID=lt_userLoginHistory.userId order by loginDate desc limit 1) as lastLogin,userRole,notes,roleName,createdBy, lt_betsettings.cricket,lt_betsettings.fancyMarkets,lt_betsettings.exchRuns,lt_betsettings.football,lt_betsettings.Tennis,lt_betsettings.horseRacing,lt_betsettings.greyhoundRacing,lt_betsettings.casino, (select paymentThreshould from lt_creditlimit where lt_creditlimit.userId=lt_users.ID ORDER by `lt_creditlimit`.`createdDate` DESC LIMIT 1) as paymentThreshould from lt_users INNER JOIN lt_userroles ON lt_userroles.ID=lt_users.userRole left join lt_betsettings ON lt_betsettings.userId=lt_users.ID         left join lt_positiontaking ON lt_positiontaking.userId=lt_users.ID  where lt_users.createdBy='+Users.userId, callback);
    },  
    getUserMax: function(callback)
    {
        return db.query('SELECT userName from lt_users order by ID desc limit 1', callback);
    },
    createMember: function (Users, callback) {
        console.log("createUser");
        // username two input box value  
        userName1 = Users.userName1;
        userName2 = Users.userName2;
        //L9870405M fix string of user name 
        userName = "L9870405M-"+userName1+userName2;
        //get current  date
        var moment = require('moment');
        var formatted = moment().format('Y-M-D hh:mm:ss');   
        //insert user details        
        return db.query('Insert into lt_users(userName,loginName, userRole, password, notes, status,createdDate,createdBy) values(?, ?,?,?,?,?,?, ?)',[userName, Users.loginName, Users.userRole, Users.password, Users.notes, Users.status,formatted,Users.addedBy],function(err, result) {
           // console.log("createUser 1");
            if(!err){
                //add credit limit
                userId = result.insertId;
                db.query('Insert into lt_creditlimit(userId,creditLimit) values(?, ?)',[userId,Users.creditLimit]);
                if(Users.added_by_roleId!="1"){
                    //get addedby user credit limit
                    var total = Users.addedBy_Creditlimit-Users.creditLimit;
                    //update added by user credit
                    db.query('update lt_creditlimit set creditLimit='+total+' where userId='+Users.addedBy+' order by lt_creditlimit.createdDate desc limit 1');
                }

                db.query('INSERT INTO lt_betsettings(userId,cricket, fancyMarkets, exchRuns, football, Tennis, horseRacing, greyhoundRacing,casino) values(?, ?, ?, ?, ?, ?, ?, ?, ?)',[ userId, "", "", "", "", "", "", "", ""]);
                
                //add position taking
                db.query('INSERT INTO lt_positiontaking(userId,sport, cricket, football, tennis, horseRacing, greyhoundRacing, casino) values(?, ?, ?, ?, ?, ?, ?, ?)',[ userId, Users.agentPosition, Users.agentPosition, Users.agentPosition, Users.agentPosition, Users.agentPosition, Users.agentPosition, Users.agentPosition],callback);
                //return result;
            }else{
                //console.log("createUser 2");
                //return error
                return err;
            }          
        });        
    },
    checkCreditLimit:function (Users, callback) {
        return db.query('SELECT creditLimit from lt_creditlimit where userId='+Users.addedBy+' order by createdDate desc limit 1', callback);
    },
    getUpdateUserCreditLimit:function (Users, callback) {
        let where_con = ' 1';
        if(Users.userId>0){
            where_con = 'userId='+Users.userId+' order by createdDate desc limit 1';
        }
        return db.query('SELECT creditLimit,paymentThreshould,userId,lt_users.userName,lt_users.loginName,lt_users.notes,lt_users.status,lt_users.createdDate from lt_creditlimit left join lt_users ON lt_users.ID=lt_creditlimit.userId where '+where_con, callback);
    },
    updateMember: function (Users, callback) {
        //console.log("update user data==="+JSON.stringify(Users.userId));
    //Update bet setting -         
        var str = "`cricket`='"+JSON.stringify(Users.cricket)+"',`fancyMarkets`='"+JSON.stringify(Users.fancyMarkets)+"',`exchRuns`='"+JSON.stringify(Users.exchRuns)+"',`football`='"+JSON.stringify(Users.football)+"',`Tennis`='"+JSON.stringify(Users.Tennis)+"',`horseRacing`='"+JSON.stringify(Users.horseRacing)+"',`greyhoundRacing`='"+JSON.stringify(Users.greyhoundRacing)+"',`casino`='"+JSON.stringify(Users.casino)+"'";        
        db.query('UPDATE `lt_betsettings` SET '+str+' WHERE  userId='+Users.userId);
        
    //Add New Credit limit   
        let new_creditLimit = Users.old_Creditlimit + parseInt(Users.creditLimit);     
        let total = Users.addedBy_Creditlimit-Users.creditLimit;        
        db.query('Insert into lt_creditlimit(userId,creditLimit,paymentThreshould) values(?, ?, ?)',[Users.userId,new_creditLimit,Users.paymentThreshould]);
        
    //update added by user cerdit limit
        if(Users.added_by_roleId!="1"){
            db.query('update lt_creditlimit set creditLimit='+total+' where userId='+Users.addedBy+' order by lt_creditlimit.createdDate desc limit 1');
        }

    //update position takiing 
        db.query('UPDATE `lt_positiontaking` SET `sport`='+Users.posSport+',`cricket`='+Users.posCricket+',`football`='+Users.posFootball+',`tennis`='+Users.posTennis+',`horseRacing`='+Users.posHorseRacing+',`greyhoundRacing`='+Users.posGreyhoundRacing+',`casino`='+Users.posCasino+' WHERE userId='+Users.userId);
    //update user password, status and notes
       return db.query('UPDATE `lt_users` set `password`="'+Users.password+'", `notes`="'+Users.notes+'", `status`="'+Users.status+'" where ID='+Users.userId,callback);
    },
    getMember: function(User,callback)
    {
        //console.log("user ID==="+JSON.stringify(User.userId))
        return db.query('SELECT lt_users.ID,lt_users.userName,lt_users.loginName,lt_users.password,lt_users.notes,lt_users.status,lt_users.createdDate,(select loginDate from lt_userLoginHistory where lt_users.ID=lt_userLoginHistory.userId order by loginDate desc limit 1) as lastLogin, lt_betsettings.cricket,lt_betsettings.fancyMarkets,lt_betsettings.exchRuns,lt_betsettings.football,lt_betsettings.Tennis,lt_betsettings.horseRacing,lt_betsettings.greyhoundRacing,lt_betsettings.casino, `sport` as posSport, lt_positiontaking.`cricket` as posCricket, lt_positiontaking.`football` as posFootball, lt_positiontaking.`tennis` as posTennis, lt_positiontaking.`horseRacing` as posHorseRacing, lt_positiontaking.`greyhoundRacing` as posGreyhoundRacing, lt_positiontaking.`casino` as posCasino, (select creditLimit from lt_creditlimit where lt_creditlimit.userId=lt_users.ID ORDER by `lt_creditlimit`.`createdDate` DESC LIMIT 1) as creditLimit from lt_users left join lt_betsettings ON lt_betsettings.userId=lt_users.ID left join lt_positiontaking ON lt_positiontaking.userId=lt_users.ID where lt_users.ID='+User.userId+' ', callback);
    },
    login: function (Users, callback) {     
       // var password = md5(Users.password);  
        return db.query('SELECT lt_users.ID,lt_users.userName,lt_users.loginName,lt_users.password,lt_users.notes,lt_users.status,lt_users.createdDate,(select loginDate from lt_userLoginHistory where lt_users.ID=lt_userLoginHistory.userId order by loginDate desc limit 1) as lastLogin, lt_betsettings.cricket,lt_betsettings.fancyMarkets,lt_betsettings.exchRuns,lt_betsettings.football,lt_betsettings.Tennis,lt_betsettings.horseRacing,lt_betsettings.greyhoundRacing,lt_betsettings.casino, `sport` as posSport, lt_positiontaking.`cricket` as posCricket, lt_positiontaking.`football` as posFootball, lt_positiontaking.`tennis` as posTennis, lt_positiontaking.`horseRacing` as posHorseRacing, lt_positiontaking.`greyhoundRacing` as posGreyhoundRacing, lt_positiontaking.`casino` as posCasino, (select creditLimit from lt_creditlimit where lt_creditlimit.userId=lt_users.ID ORDER by `lt_creditlimit`.`createdDate` DESC LIMIT 1) as creditLimit from lt_users left join lt_betsettings ON lt_betsettings.userId=lt_users.ID left join lt_positiontaking ON lt_positiontaking.userId=lt_users.ID where loginName="'+Users.userName+'" and password="'+Users.password+'"', callback);
    },
    updateLastLogin: function (Users, callback) {     
        // var password = md5(Users.password);  
        console.log("Users==="+JSON.stringify(Users));
        db.query('INSERT INTO `lt_userLoginHistory`(`userId`, `loginIp`) values(?, ?)',[Users.userId,Users.loginIp],callback); 
     },    
    getUserRoles: function(Users,callback)
    {
        var where_con = " 1";
        if(Users.roleId>0){
            where_con = " ID="+Users.roleId;
        }
        return db.query('SELECT * from lt_userroles where '+where_con, callback);
    },
    getUserPermission: function(Users,callback)
    {
        var where_con = " 1";
        if(Users.userId>0){
            where_con = " userId="+Users.userId;
        }
        return db.query('SELECT * from lt_userpermission where '+where_con, callback);
    },
    getPositionTaking: function(Users,callback)
    {
        var where_con = " 1";
        if(Users.userId>0){
            where_con = " createdBy="+Users.userId;
        }
        return db.query('SELECT lt_users.ID,userRole,userName,loginName,notes,status,sport,cricket,football,tennis,horseRacing,greyhoundRacing,casino from lt_users inner join lt_positiontaking ON lt_positiontaking.userId=lt_users.ID where '+where_con,callback);        
    },
    updatePositionTaking: function(Users,callback)
    {
        //console.log("DAta==="+JSON.stringify(Users));        
        let userIds = Users.userIds;
        const userIds_arr = userIds.split(",");
        //console.log("userIds_arr==="+userIds_arr.length);
        for(var i=0;i<userIds_arr.length;i++){                
            if(i==(userIds_arr.length-1)){
                db.query('Update lt_positiontaking SET sport='+Users.sport+',cricket='+Users.sport+',football='+Users.sport+',tennis='+Users.sport+',horseRacing='+Users.sport+',greyhoundRacing='+Users.sport+',casino='+Users.sport+' where lt_positiontaking.userId='+userIds_arr[i],callback);
            }else{
                db.query('Update lt_positiontaking SET sport='+Users.sport+',cricket='+Users.sport+',football='+Users.sport+',tennis='+Users.sport+',horseRacing='+Users.sport+',greyhoundRacing='+Users.sport+',casino='+Users.sport+' where lt_positiontaking.userId='+userIds_arr[i]);
            }
        }
    },
    addStakes: function(Users,callback)
    {
        //let stakes = Users.stake;
        //const stakes_arr = stakes.split(",");
        db.query('Insert into lt_stake(userId,stake,createdBy) values(?, ?, ?)',[Users.userId,'['+Users.stake+']',Users.addedBy],callback);
    },
    getStakes: function(Users,callback)
    {
        db.query('Select * from lt_stake where userId='+Users.userId+' order by ID DESC limit 1',callback);      
    },
    addBetSlip: function(Users,callback)
    {        
        let bet_rate = Users.odds;
        let stake = Users.stake;
        let take = Users.give + (bet_rate * stake);
        let give = Users.take + (bet_rate * stake);
        db.query('Update lt_users set give='+give+', take = '+take+' where ID='+Users.userId );

        let creditLimit = Users.creditLimit - stake;
        db.query('Insert into lt_creditlimit(userId,creditLimit) values(?, ?)',[Users.userId,creditLimit]);

        db.query('Insert into lt_betslip(odds, stake, liability, profit, event, marketId, userId, betConfirm, createdBy,oneClick,matchId) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',[Users.odds,Users.stake,Users.liability,Users.profit,Users.event,Users.marketId,Users.userId,Users.betConfirm,Users.userId,Users.oneClick,Users.matchId],callback); 
    },
    getuserTake: function(Users,callback)
    {
        db.query('Select take,give,(select creditLimit from lt_creditlimit where lt_creditlimit.userId='+Users.userId+' order by lt_creditlimit.createdDate DESC limit 1) as creditLimit  from lt_users where lt_users.ID='+Users.userId,callback);
    },
    getBetSlip: function(Users,callback)
    {
        db.query('Select lt_betslip.odds, lt_betslip.liability, profit, lt_betslip.event, lt_betslip.marketId, lt_betslip.userId, lt_betslip.betConfirm, lt_betslip.createdBy,stake,oneClick,createdDate from lt_betslip where lt_betslip.userId='+Users.userId,callback);      
    },
    getAdminUsers: function(callback)
    {
        db.query('Select lt_users.ID,userRole,userName,loginName,password,notes,status,createdDate,(select loginDate from lt_userLoginHistory where lt_users.ID=lt_userLoginHistory.userId order by loginDate desc limit 1) as lastLogin,(select loginIp from lt_userLoginHistory where lt_users.ID=lt_userLoginHistory.userId order by loginDate desc limit 1) as lastIp,createdBy from lt_users inner join lt_userroles ON lt_userroles.ID=lt_users.userRole where userRole!=5',callback);    
    },
    addAdminUsers: function(req_arr,callback)
    {
        db.query('INSERT INTO `lt_users`(`userRole`, `loginName`,`password`, `firstName`, `lastName`, `status`, `createdBy`) values(?, ?, ?, ?, ?, ?)',[req_arr.userRole,req_arr.loginName,req_arr.password,req_arr.firstName,req_arr.lastName,req_arr.status,req_arr.createdBy],callback);      
    },
    updateAdminUsers: function(req_arr,callback)
    {
        db.query('Update `lt_users` SET  `firstName`="'+req_arr.firstName+'", `lastName`="'+req_arr.lastName+'",`password`="'+req_arr.password+'", `status`='+req_arr.status+' where ID='+req_arr.userId,callback);     
    },
}

module.exports = Matiere;
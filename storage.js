class Storage {

    static getSearchedUsersFromStorage(){
      

        let users;

        if (localStorage.getItem("searched") === null) {
            users = [];
        }
        else {
            users = JSON.parse(localStorage.getItem("searched"));

        }
        return users;

    }
    static addSearchedUserToStorage(username){
        
        let users = this.getSearchedUsersFromStorage();

       

        if (users.indexOf(username) === -1) {
            users.push(username);
        }
        localStorage.setItem("searched",JSON.stringify(users));


    }
    static clearAllSearchedUsersFromStorage(){
      

        localStorage.removeItem("searched");
    }

    static deleteSearchedUserFromStorage(username) {
        let users = this.getSearchedUsersFromStorage();
        const index = users.indexOf(username);
        if (index > -1) {
          users.splice(index, 1);
        }
        localStorage.setItem("searched", JSON.stringify(users));
      }

}
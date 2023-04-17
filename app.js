

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
    clearLastUsers.addEventListener("click", clearAllSearched);
}
function getData(e){
    let username = nameInput.value.trim();

    if (username === ""){
        alert("Please enter a username");
    }
    else {

        github.getGithubData(username)
        .then(response =>{
            if (response.user.message === "Not Found"){
                ui.resetUI();
                ui.showError("User Not Found");
                ui.hideLatestRepos();
                
            }
            else {
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
                getAllSearched();
                ui.showLatestRepos();
            }
        })
      
        .catch(err => {
            ui.resetUI(); 
            ui.showError(err);
        });
    }
    ui.clearInput();
    e.preventDefault();
}
function clearAllSearched(){
    
    if (confirm("Are U Sure ?")){
        Storage.clearAllSearchedUsersFromStorage(); 
        ui.clearAllSearchedFromUI();
    ui.hideRecentSearches();
        const recentSearchesContainer = document.getElementById("recent-searches-container");
        recentSearchesContainer.style.display = "none"; // Add this line
       
    
    }




}
function getAllSearched() {
    let users = Storage.getSearchedUsersFromStorage();
    let result = "";

    users.forEach(user => {
        result += `
        <li class="list-group-item d-flex justify-content-between">
          ${user}
          <button class="btn btn-danger btn-sm" onclick="deleteUser('${user}')">X</button>
        </li>`;;
    });

    if (users.length === 0) {
        ui.hideRecentSearches();
    } else {
        ui.showRecentSearches();
        lastUsers.innerHTML = result;
    }
}

function deleteUser(username) {
    Storage.deleteSearchedUserFromStorage(username);

    ui.deleteSearchedUserFromUI(username);

    const items = document.querySelectorAll("#last-users li");
    if (items.length === 0) { // Son öğeyi sildikten sonra items.length 1 olacaktır.
      ui.hideRecentSearches();
    }
  }
  

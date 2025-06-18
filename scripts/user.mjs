export default class User {
    constructor(firstName, lastName, userName, email, phone, password, description) {
        this.firstName = firstName
        this.lastName = lastName
        this.userName = userName
        this.email = email
        this.phone = phone
        this.password = password
        this.description = description
        this.favorite = [];
    }
    //It displays a welcome message for the user
    welcomeMessage(object) {
       return `
         <h1 class="welcome-title">Welcome ${object.userName} to ComicVerse!</h1>
            <p class="welcome-message">
                Dive into an amazing world of comics and graphic novels. Discover new heroes,
                explore epic adventures, and join our community of comic book enthusiasts.
            </p>
            <button class="logout-button" type="button">
                Log Out
            </button>
        `;
    }
    //It handle the log out when the lcient click the button
    logout(){
            document.querySelector('.logout-button').addEventListener('click', () => {
            localStorage.removeItem('sessionActive');
            window.location.href = "/profile.html";
        })
    }
}
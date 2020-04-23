export function generateArticleHtml(articleArr, readTimeArr = null) {
    let articlesHTML = "";

    if (articleArr.length < 1) {
        articlesHTML = `<div class="article-container text-style2"><a class="article-title">No stories found.</div>`;
        return articlesHTML;
    }

    if (readTimeArr) {
        let readTimes = [];
        readTimeArr.map(obj => {
            readTimes.push(obj.text);
        });
        console.log(readTimes);
        let readCount = 0;
        articleArr.forEach(articleObj => {
            articlesHTML += `<div class="article-container text-style2"><a class="article-title text-style1" href="/stories/${articleObj.id}">${articleObj.title}</a><div class="article-subheader">${articleObj.subHeading}</div>
            <div class="article-author">${articleObj.User.firstName} ${articleObj.User.lastName} in ${articleObj.StoryCategory.categoryName}</div><div class="article-date">${new Date(articleObj.createdAt.replace("T", " ")).toDateString()}</div>
            <div class="article-time">${readTimes[readCount]}</div><div class="article-likes">Likes</div></div>`;
            readCount++;
        });
    } else {

    }

    return articlesHTML;
}

export function generateUserHtml(users) {
    let userHTML = '';

    if (users.length < 1) {
        userHTML = `<div class="article-container text-style2"><a class="article-title">No users found.</div>`;
        return userHTML;
    }

    users.forEach(userObj => {
        userHTML += `<div class="user-container text-style2"><a class="user-username" href="/profile/${userObj.id}">${userObj.userName}</a>
        <div class="user-first-name">${userObj.firstName}</div><div class="user-last-name">${userObj.lastName}</div></div>`;
    });

    return userHTML;
}

export const handleErrors = async (err) => {
    if (err.status >= 400 && err.status < 600) {
        const errorJSON = await err.json();
        const errorsContainer = document.querySelector(".errors-container");
        let errorsHtml = [
            `
        <div class="alert alert-danger">
            Something went wrong. Please try again.
        </div>
      `,
        ];
        const { errors } = errorJSON;
        if (errors && Array.isArray(errors)) {
            errorsHtml = errors.map(
                (message) => `
          <div class="alert alert-danger">
              ${message}
          </div>
        `
            );
        }
        errorsContainer.innerHTML = errorsHtml.join("");
    } else {
        alert(
            "Something went wrong. Please check your internet connection and try again!"
        );
    }
};

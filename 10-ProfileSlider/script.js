const users = [
    {
        username: "Hamza Ali Mazari",
        pfp: "./avatars/av01.png",
        bio: "Product Designer who focuses on simplicity & usability",
        color: "bg-orange-500",
        socialStats: {
            Likes: "72.9K",
            Posts: "342",
            Followers: "1.2M"
        }
    },
    {
        username: "Yalina Jamali",
        pfp: "./avatars/av02.png",
        bio: "Frontend developer crafting smooth UI experiences",
        color: "bg-blue-500",
        socialStats: {
            Likes: "18.4K",
            Posts: "129",
            Followers: "84.7K"
        }
    },
    {
        username: "Ajay Sanyal",
        pfp: "./avatars/av03.png",
        bio: "Digital illustrator & visual storyteller",
        color: "bg-cyan-500",
        socialStats: {
            Likes: "95.1K",
            Posts: "540",
            Followers: "2.3M"
        }
    },
    {
        username: "SP Chaudhary Aslam",
        pfp: "./avatars/av04.png",
        bio: "Building scalable web apps and loving JavaScript",
        color: "bg-rose-500",
        socialStats: {
            Likes: "11.2K",
            Posts: "98",
            Followers: "56.2K"
        }
    },
    {
        username: "Rehman Dakait",
        pfp: "./avatars/av05.png",
        bio: "UX researcher obsessed with user behavior",
        color: "bg-emerald-500",
        socialStats: {
            Likes: "63.8K",
            Posts: "410",
            Followers: "910K"
        }
    },
    {
        username: "Major Iqbal",
        pfp: "./avatars/av06.png",
        bio: "Creative coder blending design & motion",
        color: "bg-purple-500",
        socialStats: {
            Likes: "44.6K",
            Posts: "276",
            Followers: "320K"
        }
    }
];

const root = document.getElementById("root");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function setRootStyle() {
    root.className = "relative max-w-96 max-h-[492px] font-[Satoshi] text-neutral-100 flex items-center justify-start";
}

function createUser(user) {
    const card = document.createElement("div");
    card.className = "bg-neutral-900 w-96 min-w-[24rem] h-[492px] p-3 rounded-4xl relative shrink-0 shadow-lg shadow-black/40";

    const topBar = document.createElement("div");
    topBar.className = "w-full text-neutral-950 h-fit flex justify-end absolute px-5 top-5 left-0";

    const button = document.createElement("button");
    button.className = "bg-neutral-100 group p-2.5 cursor-pointer transition-all duration-150 hover:py-2.5 hover:px-5 flex items-center gap-2 rounded-full ";


    const spanFollow = document.createElement("span");
    spanFollow.className = "font-medium hidden group-hover:inline leading-none";
    spanFollow.textContent = "Follow";

    const checkIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    checkIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    checkIcon.setAttribute("width", "20");
    checkIcon.setAttribute("height", "20");
    checkIcon.setAttribute("viewBox", "0 0 24 24");
    checkIcon.setAttribute("fill", "none");
    checkIcon.setAttribute("stroke", "currentColor");
    checkIcon.setAttribute("stroke-width", "2");
    checkIcon.setAttribute("stroke-linecap", "round");
    checkIcon.setAttribute("stroke-linejoin", "round");
    checkIcon.setAttribute("class", "icon icon-tabler icons-tabler-outline icon-tabler-check");

    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("stroke", "none");
    path1.setAttribute("d", "M0 0h24v24H0z");
    path1.setAttribute("fill", "none");

    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M5 12l5 5l10 -10");

    checkIcon.append(path1, path2);

    const plusIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    plusIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    plusIcon.setAttribute("width", "20");
    plusIcon.setAttribute("height", "20");
    plusIcon.setAttribute("viewBox", "0 0 24 24");
    plusIcon.setAttribute("fill", "currentColor");

    const plusPath1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    plusPath1.setAttribute("stroke", "none");
    plusPath1.setAttribute("d", "M0 0h24v24H0z");
    plusPath1.setAttribute("fill", "none");

    const plusPath2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    plusPath2.setAttribute("d", "M12 4a1 1 0 0 1 1 1v6h6a1 1 0 0 1 0 2h-6v6a1 1 0 0 1 -2 0v-6h-6a1 1 0 0 1 0 -2h6v-6a1 1 0 0 1 1 -1");

    plusIcon.append(plusPath1, plusPath2);

    checkIcon.append(path1, path2);
    checkIcon.style.display = "none";
    button.append(spanFollow, plusIcon, checkIcon);
    topBar.appendChild(button);


    const followingCard = document.createElement("div");
    followingCard.className = `w-16 h-16 flex items-center justify-center overflow-hidden rounded-full ${user.color}`
    const followingCardInner = document.createElement("div");
    followingCardInner.className = `w-14 h-14 overflow-hidden rounded-full`
    const followingImg = document.createElement("img")
    followingImg.src = user.pfp;
    followingImg.alt = `${user.username} avatar`;
    followingImg.className = "w-full h-full rounded-full object-cover";
    followingCardInner.appendChild(followingImg);
    followingCard.appendChild(followingCardInner);


    button.addEventListener("click", () => {
        let isFollowing = button.classList.contains("text-green-600");
        button.classList.toggle("text-green-600");
        if (button.classList.contains("text-green-600")) {
            spanFollow.textContent = "Following";
            plusIcon.style.display = "none";
            checkIcon.style.display = "block";
        } else {
            spanFollow.textContent = "Follow";
            plusIcon.style.display = "block";
            checkIcon.style.display = "none";
        }
        if (isFollowing) {
            document.getElementById("followingList").removeChild(followingCard)

        } else {
            document.getElementById("followingList").appendChild(followingCard)
        }
    });
    const banner = document.createElement("div");
    banner.className = "w-full h-38 bg-neutral-800 rounded-3xl overflow-hidden";

    const bannerImg = document.createElement("img");
    bannerImg.src = `https://picsum.photos/seed/${encodeURIComponent(user.username)}/400/200`;
    bannerImg.alt = `${user.username} banner`;
    bannerImg.className = "w-full h-full object-cover";

    banner.appendChild(bannerImg);

    const avatarWrapper = document.createElement("div");
    avatarWrapper.className = "w-full h-fit flex items-center justify-center absolute top-30 left-0";

    const avatarOuter = document.createElement("div");
    avatarOuter.className = `w-20 h-20 rounded-full ${user.color} flex items-center justify-center`;

    const avatarInner = document.createElement("div");
    avatarInner.className = "w-18 bg-neutral-50 h-18 overflow-hidden rounded-full";

    const avatarImg = document.createElement("img");
    avatarImg.src = user.pfp;
    avatarImg.alt = `${user.username} avatar`;
    avatarImg.className = "w-full h-full object-cover";

    avatarInner.appendChild(avatarImg);
    avatarOuter.appendChild(avatarInner);
    avatarWrapper.appendChild(avatarOuter);

    const content = document.createElement("div");
    content.className = "w-full mt-12 h-[268px] flex flex-col items-center justify-between";

    const name = document.createElement("span");
    name.className = "text-xl tracking-tight leading-none text-neutral-50";
    name.textContent = user.username;

    const bio = document.createElement("span");
    bio.className = "text-center max-w-72 mt-4 text-neutral-400 tracking-tight";
    bio.textContent = user.bio;

    const stats = document.createElement("div");
    stats.className = "w-full flex bg-neutral-800/80 rounded-xl mt-18";

    const makeStat = (value, label) => {
        const box = document.createElement("div");
        box.className = "w-1/3 h-16 flex flex-col items-center justify-center";

        const val = document.createElement("span");
        val.className = "text-xl leading-none font-medium";
        val.textContent = value;

        const lab = document.createElement("span");
        lab.className = "leading-none mt-2 text-sm text-neutral-300";
        lab.textContent = label;

        box.append(val, lab);
        return box;
    };

    stats.append(
        makeStat(user.socialStats.Likes ?? "0", "Likes"),
        makeStat(user.socialStats.Posts ?? "0", "Posts"),
        makeStat(user.socialStats.Followers ?? "0", "Followers")
    );

    const social = document.createElement("div");
    social.className = "w-full h-10 mt-2 gap-4 flex items-center justify-center";

    const createIcon = (paths) => {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("width", "24");
        svg.setAttribute("height", "24");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "2");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");

        paths.forEach(d => {
            const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
            for (let key in d) p.setAttribute(key, d[key]);
            svg.appendChild(p);
        });

        return svg;
    };

    const instagram = createIcon([
        { stroke: "none", d: "M0 0h24v24H0z", fill: "none" },
        { d: "M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4l0 -8" },
        { d: "M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" },
        { d: "M16.5 7.5v.01" }
    ]);

    const twitter = createIcon([
        { stroke: "none", d: "M0 0h24v24H0z", fill: "none" },
        { d: "M4 4l11.733 16h4.267l-11.733 -16l-4.267 0" },
        { d: "M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" }
    ]);

    const threads = createIcon([
        { stroke: "none", d: "M0 0h24v24H0z", fill: "none" },
        { d: "M19 7.5c-1.333 -3 -3.667 -4.5 -7 -4.5c-5 0 -8 2.5 -8 9s3.5 9 8 9s7 -3 7 -5s-1 -5 -7 -5c-2.5 0 -3 1.25 -3 2.5c0 1.5 1 2.5 2.5 2.5c2.5 0 3.5 -1.5 3.5 -5s-2 -4 -3 -4s-1.833 .333 -2.5 1" }
    ]);

    social.append(instagram, twitter, threads);

    content.append(name, bio, stats, social);

    card.append(topBar, banner, avatarWrapper, content);

    root.appendChild(card);
}

function initialize() {
    setRootStyle();
    root.innerHTML = "";

    users.forEach(createUser);
}

function slider(index) {

    root.style.transform = `translateX(-${index * 100}%)`;

}

let currentIndex = 0;

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + users.length) % users.length;
    slider(currentIndex);
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % users.length;
    slider(currentIndex);
});

initialize();
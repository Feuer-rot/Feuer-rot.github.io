document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.querySelector(".burger-menu");
    const navMenu = document.querySelector("header ul");


    burgerMenu.addEventListener("click", (event) => {
        event.stopPropagation(); 
        navMenu.classList.toggle("open");
    });

    document.addEventListener("click", (event) => {
        if (!navMenu.contains(event.target) && !burgerMenu.contains(event.target)) {
            navMenu.classList.remove("open");
        }
    });

    navMenu.addEventListener("mouseleave", () => {
        navMenu.classList.remove("open");
    });
});

document.addEventListener("DOMContentLoaded", () => {
        const toggle = document.getElementById("toggle");
        const headline2 = document.querySelector("#welcome h2");
        const headline = document.querySelector("h1 a");
        const menu = document.querySelector("header ul");
        const work = document.querySelector("#work")
        const arrow = document.querySelector(".arrow");
        const aboutMe = document.querySelector(".about-me-wrapper");

    toggle.addEventListener("change", () => {
        if (toggle.checked) {      

            if (headline2) headline2.textContent = "Hi, welcome to my Art Portfolio";

            if (headline) headline.textContent = "FEUERROT.art";

            if (menu) menu.innerHTML = `
            <li><a href='#'>Home</a></li>
            <li><a href='animation.html'>Animation</a></li>
            <li><a href='3d.html'>3D</a></li>
            <li><a href='illustration.html'>Illustration</a></li>
            <li><a href='#about-me'>About Me</a></li>
            <li><a href='#contact'>Contact</a></li>
            `;

            if (work) work.style.display = "none";

            if (arrow) arrow.href = "animation.html";

            if(aboutMe) aboutMe.innerHTML = ` 
                <img src='images/profile-pic.webp' alt='Profile Picture of Mailin Knaak'>
                <p>Hi! I’m Mailin, an Illustration Student at HAW in Hamburg, a creative developer and digital artist with a love for all things visual and interactive.<br> I enjoy working where creativity meets technology— whether it's crafting 3D models, building smooth web interfaces, or bringing ideas to life through animation. I want to create things that invite curiosity — playful, visual, and a bit offbeat in all the right ways.<br><br>When I’m not in front of a screen, you’ll probably find me sketching, exploring new creative tools, or out on an outdoor adventure.</p><ul><p>Exhibitons:</p><br><li><a href='https://www.instagram.com/p/CbvE5FVNiA6/?utm_source=ig_web_copy_link&amp;igsh=MzRlODBiNWFlZA==' target='_blank'>Urban Apes Wall + Art </a>&nbsp;(all Urban Apes Locations) <em>since Feb 2022</em></li><li><a href='/illustration/'>'Feste Feiern!' (MK&amp;G, Hamburg)</a> <em>16.02.2024 - 19.01.2025</em></li></ul>
            `;

        } else {
            if (headline2) headline2.textContent = "Hi, welcome to my Developer Portfolio";

            if (headline) headline.textContent = "FEUERROT.dev";

            if (menu) menu.innerHTML = `
            <li><a href='index.html#'>Home</a></li>
            <li><a href='index.html#work'>Work</a></li>
            <li><a href='#about-me'>About Me</a></li>
            <li><a href='#contact'>Contact</a></li>
            `;

            if (work) work.style.display = "block";

            if (arrow) arrow.href = "#work";

            if(aboutMe) aboutMe.innerHTML = `
                <img src='images/profile-pic.webp' alt='Profile Picture of Mailin Knaak'>
                <p>Hi! I’m Mailin, an Illustration Student at HAW in Hamburg, a creative developer and digital artist with a love for all things visual and interactive.<br> I enjoy working where creativity meets technology— whether it's crafting 3D models, building smooth web interfaces, or bringing ideas to life through animation. I want to create things that invite curiosity — playful, visual, and a bit offbeat in all the right ways.<br><br>When I’m not in front of a screen, you’ll probably find me sketching, exploring new creative tools, or out on an outdoor adventure.</p>
            `;

        }
    });
});

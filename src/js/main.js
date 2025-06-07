import MicroModal from "micromodal";
import { burger } from "./modules/burger";
import initReadMore from "@corgras/readmore-js";

MicroModal.init();
initReadMore(".readmore", {
	collapsedHeight: 100, // Height of the collapsed block in pixels
	speed: 0,
	scrollToTopOnCollapse: false, // Scroll to the top of the page when collapsing
	animation: "ease-in-out", // Animation type
	animationMode: "css", // Animation duration in milliseconds
	moreLink: "<span class='showmore-btn'>Read More</span>", // Expand button text
	lessLink: "<span class='showmore-btn'>Collapse</span>", // Collapse button text
});

document.addEventListener("DOMContentLoaded", function () {
	const bonusElements = document.querySelectorAll(".bonuscode");

	bonusElements.forEach((element) => {
		element.style.cursor = "pointer";

		element.addEventListener("click", function () {
			const originalText = this.innerText.trim();

			navigator.clipboard
				.writeText(originalText)
				.then(() => {
					this.innerText = "Copyed to clipboard";
					this.classList.add("copyed");

					// Возврат через 5 секунд
					setTimeout(() => {
						this.innerText = originalText;
						this.classList.remove("copyed");
					}, 5000);
				})
				.catch((err) => {
					console.error("Ошибка при копировании:", err);
				});
		});
	});

	const bonuses = document.querySelectorAll(".casino-bonus");

	bonuses.forEach((bonus) => {
		const open = bonus.querySelector(".casino-bonus__text");
		const close = bonus.querySelector(".bonus-popup__close");

		open.addEventListener("click", (e) => {
			e.stopPropagation();
			bonuses.forEach((b) => b !== bonus && b.classList.remove("active"));
			bonus.classList.toggle("active");
		});

		close.addEventListener("click", (e) => {
			e.stopPropagation();
			bonus.classList.remove("active");
		});
	});
});

burger();

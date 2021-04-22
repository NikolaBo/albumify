/*
 * Name: Nikola Bojanic
 * Date: April 21, 2021
 * Section: CSE 154 AF
 *
 * This is the JS to implement the customization of song and track name
 * for my track player design, it also handles scaling of the design.
 * I hope to add more features but I may run out of time and have
 * to submit as is.
 */

"use strict";

(function() {
  window.addEventListener("load", init);

  // Global variable needed to scale design proportionally
  let initialFontSize;

  // Counter needed to keep track of current customization menu page
  let currentPage = 0;

  // Ids of the possible customization menu pages
  const pageIds = [
    "song",
    "artist"
  ];

  // Functions to generate the possible customization menu pages
  const generators = [
    () => generateInput(pageIds[0]),
    () => generateInput(pageIds[1])
  ];

  /**
   * Initializes page/sets up event listeners
   */
  function init() {
    setUpScaling();
    document.body.addEventListener("click", backgroundClicked);
    id("page-btn").addEventListener("click", nextPage);
    generateInput(pageIds[0]);
  }

  /**
   * Set up event listeners for buttons that scale design
   */
  function setUpScaling() {
    const html = document.documentElement;
    initialFontSize = window.getComputedStyle(html).getPropertyValue('font-size');
    initialFontSize = parseFloat(initialFontSize);
    id("grow").addEventListener("click", function() { scale(0.1); });
    id("shrink").addEventListener("click", function() { scale(-0.1); });
  }

  /**
   * Removes current menu page and generates next
   */
  function nextPage() {
    const menuPage = id("menu-page");
    while (menuPage.hasChildNodes()) {
      menuPage.removeChild(menuPage.firstChild);
    }
    currentPage = (currentPage + 1) % pageIds.length;
    generators[currentPage]();
  }

  /**
   * Generates one of the two possible menu inputs
   * @param {string} inputId - the id to give generated input
   */
  function generateInput(inputId) {
    const menuPage = id("menu-page");

    // Set up label
    let label = document.createElement("label");
    label.setAttribute("for", inputId);
    let content = inputId.charAt(0).toUpperCase() + inputId.slice(1) + " Name:";
    label.textContent = content;
    menuPage.appendChild(label);

    // Set up input
    let input = document.createElement("input");
    input.id = inputId;
    input.addEventListener("input", updateText);
    menuPage.appendChild(input);
  }

  /**
   * Updates text corresponding to given input
   * @param  event - information about input event
   */
  function updateText(event) {
    let inputId = event.target.id;
    let toUpdate;
    switch (inputId) {
      case "song":
        toUpdate = "song-name";
        break;
      case "artist":
        toUpdate = "artist-name"
        break;
    }
    id(toUpdate).textContent = event.target.value;
  }

  /**
   * Callback when HTML body clicked
   * @param event - information about click event
   */
  function backgroundClicked(event) {
    if (event.target.closest(".menu-item") === null) {
      toggleMenu();
    }
  }

  /**
   * Show/hide menu items
   */
  function toggleMenu() {
    const menu = qsa(".menu-item");
    console.log(menu);
    for (let i = 0; i < menu.length; i++) {
      menu[i].classList.toggle("hidden");
    }
  }

  /**
   *  Shifts rem based design by changing root font size
   * @param {number} percentChange
   */
  function scale(percentChange) {
    const html = document.documentElement;
    const currentSize = window.getComputedStyle(html).getPropertyValue('font-size');
    let fontSize = parseFloat(currentSize);
    html.style.fontSize = fontSize + percentChange * initialFontSize + "px";
  }

  function id(idValue) {
    return document.getElementById(idValue);
  }

  function qs(selector) {
    return document.querySelector(selector);
  }

  function qsa(selector) {
    return document.querySelectorAll(selector);
  }
})();
---
layout: default
title: Travel Offers
class: travel-offers
nav-order: 7
intro: >
  South Africa is often described as an entire world in one country, and with so many incredible experiences to be had this year, now is the time to visit. Browse our offers on regional tours and sumptuous stays at top-end hotels.
---

<div class="row intro intro--margin-bottom">
  <img class="js-svg-swap logo logo--stylist stamp-effect stamp-effect--large" src="{{site.baseurl}}/img/logo/stylist-stamp.png" alt="Stylist Logo">
  <h1 class="intro__title">{{page.title}}</h1>
  <p class="intro__description">{{page.intro}}</p>
</div>

<div class="offers row">
  <div class="row">
    {% include offers.html %}
  </div>
</div>
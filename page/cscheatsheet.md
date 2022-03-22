---
layout: page
permalink: /cscheatsheet/
title: ComputerScienceCheatSheet
---

<div>
  <p>a quick guide and study notes for basic algorithms, datastructure, and etc. basically, my summary for core comp sci classes i tooked at the college.
Python is used for the example codes.
</p><br/>
</div>

<div class="posts">
  {% for post in site.categories.ComputerScienceCheatSheet %}
  <section class="post-entry">
    <h2 class="post-title">
      <a href="{{ post.url | relative_url }}">
        {{ post.title }}
      </a>
    </h2>
    <div class="post-meta">
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date_to_string }}</time>
      {%- if jekyll.environment == "production" and site.disqus -%}
        <span> • </span>
        <a class="comment-count" href="{{ post.url | relative_url }}#disqus_thread">
          <span class="disqus-comment-count" data-disqus-url="{{ post.url | absolute_url }}"></span>
        </a>
      {%- endif -%}
    </div>
  </section>
  {% endfor %}
  {%- if jekyll.environment == "production" and site.disqus -%}
    <script id="dsq-count-scr" src="//{{ site.disqus }}.disqus.com/count.js" async></script>
  {%- endif -%}
</div>
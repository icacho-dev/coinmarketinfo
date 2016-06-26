<?php
include('GoogleNews.php');
$news = new GoogleNews();
$news->setSearchQuery('Bitcoin');
$news->setNumberOfNews('4');
echo $news->getNews();
?>
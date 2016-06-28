<?php
header('Access-Control-Allow-Origin: http://www.coinmarketinfo.com');
header('Access-Control-Allow-Origin: http://coinmarketinfo.com');
include('GoogleNews.php');
$news = new GoogleNews();
$news->setSearchQuery('Bitcoin');
$news->setNumberOfNews('4');
echo $news->getNews();
?>
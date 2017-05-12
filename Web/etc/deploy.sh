t_deploy
# 3 + 4 = git pull
git fetch

# if something changed on master
c1=`git rev-parse master`
c2=`git rev-parse origin/master`

if [[ $c1 != $c2 ]];then
	echo "Start deploy: `date`"

	git merge origin/master
	sudo rm -rf /var/www/html/*
	sudo cp -a * /var/www/html
	sudo service apache2 reload
else
echo "nothing to do..."
fi

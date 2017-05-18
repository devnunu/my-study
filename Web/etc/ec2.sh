nstance=i-074c4e8dbc4cfd6ea

aws ec2 describe-instances --instance-ids $instance --query Reservations[*].Instances[*].[InstanceId,State.Name,Tags[0].Value,PublicDnsName] --output text 

echo '+-------------------+'
echo '| 1. start instance |'
echo '| 2. stop instance  |'
echo '+-------------------+'
printf "choose (1-2): "
read choice

echo $choice
if [ $choice -eq 1 ];then
	echo "start instance $instane"
	aws ec2 start-instances --instance-ids $instance 
elif [ $choice -eq 2 ]; then
	echo "stop instance $instance"
	aws ec2 stop-instances --instance-ids $instance --dry-run
else 
	echo "bye~"
fi

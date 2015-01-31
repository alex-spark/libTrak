import sys
import urllib2
import time

user = 'admin'
pwd = 'password'
host = '192.168.1.1'
url = 'http://' + host + '/DEV_device.htm'
outputfile = open('output.txt','w')


passman = urllib2.HTTPPasswordMgrWithDefaultRealm()
passman.add_password(None, host, user, pwd)
authhandler = urllib2.HTTPBasicAuthHandler(passman)

opener = urllib2.build_opener(authhandler)
response = opener.open(url)
stuff = response.read()
#print stuff

time.sleep(15)
url = 'http://' + host + '/DEV_show_device.htm'

response = opener.open(url)
time.sleep(3)
stuff = response.read()

response.close()
search_string="attach_device_list"
start_index=stuff.find(search_string)
end_index=stuff.find("var attach_array",start_index)
#temp=ans=stuff[start_index+len(search_string)+2:end_index-3]
#print ("\n------------------------------------------------------------------------------------------\n")
#print stuff
ans=stuff[start_index+len(search_string)+2:end_index-10].split(" @#$&*! ")
count=1
for temp in ans:
	#print (str(count) +" "+temp)
	#count=count+1
	if "android" in temp.lower() or "windows" in temp.lower() or "iphone" in temp.lower():
		outputfile.write(temp+'\n')
#print stuff
outputfile.close
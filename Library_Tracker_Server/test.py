

import urllib2

user = 'admin'
pwd = 'password'
host = '10.136.0.1'
url = 'http://' + host + '/DEV_device.htm'

passman = urllib2.HTTPPasswordMgrWithDefaultRealm()
passman.add_password(None, host, user, pwd)
authhandler = urllib2.HTTPBasicAuthHandler(passman)

opener = urllib2.build_opener(authhandler)
response = opener.open(url)
stuff = response.read()


url = 'http://' + host + '/DEV_show_device.htm'

response = opener.open(url)
stuff = response.read()

response.close()
search_string="attach_device_list"
start_index=stuff.find(search_string)
end_index=stuff.find("var attach_array",start_index)
temp=ans=stuff[start_index+len(search_string)+2:end_index-3]
#print(temp)
ans=stuff[start_index+len(search_string)+2:end_index-3].split("@#$&*!")
for temp in ans:
	print temp
#print stuff

import json
import requests


url = "http://localhost:8191/sensor"
#url = "http://192.168.0.16:8190/register"
data = {'count' : 0}
headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
r = requests.post(url, data=json.dumps(data), headers=headers)
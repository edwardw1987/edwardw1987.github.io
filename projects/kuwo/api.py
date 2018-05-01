from kuwo import KuwoMusic
from tornadog.handler import Api
from tornadog.webutil import json_dumps

class ApiSearch(Api):
    url_pattern = '/km/search/?'
    def get(self):
        kwd = self.get_argument('kwd')
        pn  = self.get_argument('pn', '0')
        rn  = self.get_argument('rn', '10')
        km = KuwoMusic()
        signal = km.search(kwd, pn, rn)
        # for idx, val in enumerate(abslist):
        #     val['mp3url'] = km.get_mp3_url(idx)
        if signal == -1:
            jsonstr = "time out"    
        else:
            jsonstr = json_dumps( km.get_jsondata(), sort_keys=True)

        self.write_json(jsonstr)

class ApiDetail(Api):
    url_pattern = '/km/getMuiseByRid/?'
    def post(self):
        rid = self.get_argument('rid')
        km = KuwoMusic()
        jsonstr = json_dumps(km.get_detail(rid), sort_keys=True)
        self.write_json(jsonstr)

handlers = Api.fetch(url_prefix='/api')
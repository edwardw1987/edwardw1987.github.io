from tornadog.handler import View
from kuwo import KuwoMusic
from uuid import uuid4
import random

class ViewKuwoMusic(View):
    url_pattern = '/kuwomusic.html'
    def get(self):
        all_jpg = self.glob("static/img/*thumbnail.jpg")
        random.shuffle(all_jpg)
        self.render("kuwomusic.html", backgroundImage='/' + all_jpg[-1])

class ViewSongList(View):
    url_pattern = '/song/list/?'
    def get(self):
        kwd = self.get_argument('kwd', '')
        pn = self.get_argument('pn', '1')
        rn = self.get_argument('rn', '12')
        km = KuwoMusic()

        signal = km.search(kwd, int(pn) - 1, rn)
        if signal == -1:
            self.write("backend requsted timeout!!")
        else:
            self.render("song_list.html",
                        jsondata=km.get_jsondata(),
                        rn=int(rn), kwd=self.url_escape(kwd), pn=pn, song_key=uuid4().hex)


handlers = View.fetch(url_prefix='/spa')
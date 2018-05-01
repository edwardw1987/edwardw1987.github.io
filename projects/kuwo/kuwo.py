#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: edward
# @Date:   2016-08-18 22:42:42
# @Last Modified by:   edward
# @Last Modified time: 2018-04-29 16:22:26
from requests import Session, ConnectTimeout
import time
import string
import random
import re


class KuwoMusic(Session):
    response = None
    query_strings = dict(
        all="<search_kwd>",
        ft="music",
        newsearch="1",
        itemset="web_2013",
        client="kt",
        cluster="0",
        pn="0", # page num
        rn="12", # row num
        rformat="json",
        callback="searchMusicResult",
        encoding="utf8",
        _="<timestamp>",
    )
    def get_timestamp(self):
        timestamp = (str)(time.time()).replace('.', '') + random.choice(string.digits)
        return  timestamp

    def search(self, kwd, pn=0, rn=12, timeout=3):
        params = self.query_strings.copy()
        params.update(
            all=kwd,
            pn=pn,
            rn=rn,
            _=self.get_timestamp())
        try:
            self.response = self.get('http://search.kuwo.cn/r.s?', params=params, timeout=timeout)
            print self.response.text
        except ConnectTimeout:
            return -1

    def get_jsondata(self):
        findr = re.findall('=({.*});', self.response.text)
        return eval(findr[0])
    def get_abslist(self):
        findr = re.findall('\'abslist\':(\[.*\])', self.response.text)
        return eval(findr[0])

    def get_detail(self, rid):
        resp = self.post("http://player.kuwo.cn/webmusic/st/getMuiseByRid",
                      data={"rid": rid})
        xml = resp.text
        print xml
        ret = {}
        for k in {'mp3path', 'mp3dl', 'aacpath', 'aacdl', 'artist_pic240'}:
            ret[k] = self.get_xml_value(k, xml)
        ret['mp3url'] = "http://%s" % (ret['mp3dl'] + ret['mp3path'])
        ret['aacurl'] = "http://%s" % (ret['aacdl'] + ret['aacpath'])
        return  ret

    def get_xml_value(self, tag_name, xml):
        findr = re.findall('<{tag}>(.*)</{tag}>'.format(tag=tag_name), xml)
        return findr[0]

def main():
    kw = KuwoMusic()
    kw.search('kara')
    rid = kw.get_abslist()[0]['MUSICRID']
    print kw.get_detail(rid)
if __name__ == '__main__':
    main()
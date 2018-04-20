# -*- coding: utf-8 -*-
# @Author: wangwh8
# @Date:   2018-04-20 10:57:40
# @Last Modified by:   wangwh8
# @Last Modified time: 2018-04-20 11:14:02
import os
import os.path
from PIL import Image
import glob

curdir = os.path.dirname(__file__)

img_source_dir = os.path.join(curdir, "../material/img/")
img_output_dir = os.path.join(curdir, "../assets/img/")

def zoomImage(filein, fileout, ratio, type):
    img = Image.open(filein)
    zoomSize = [int(i * ratio) for i in img.size]
    # resize image with high-quality
    out = img.resize(zoomSize, Image.ANTIALIAS)
    out.save(fileout, type)


if __name__ == "__main__":

    zoom_ratio = 0.1
    type = 'jpeg'
    for imgfp in glob.glob(os.path.join(img_source_dir, "*")):
        filein = imgfp
        fileout = os.path.join(img_output_dir, os.path.split(imgfp)[1])
        zoomImage(filein, fileout, zoom_ratio, type)

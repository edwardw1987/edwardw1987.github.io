---
layout: post
title:  "Paramiko实战,python,ssh登录执行,returncode,output"
date:   2018-04-19 14:03:50 +0800
categories: post
---

{% highlight python %}
import paramiko
import os
import logging


class GetSSH(paramiko.SSHClient):
    def __init__(self, ip, user, passwd=None, port=22, retry=3, retry_interval=10):
        super(GetSSH, self).__init__()
        self.ip = ip
        self.user = user
        self.passwd = passwd
        self.port = port
        self.retry = retry
        self.retry_interval = retry_interval
        self._connect_ssh_server(ip, user, passwd, port, retry, retry_interval)

    def _connect_ssh_server(self, ip, user, passwd=None, port=22, retry=3, retry_interval=10):
        if retry < 0:
            raise Exception("No More Retry! Throw Error!")
        private_key = paramiko.RSAKey.from_private_key_file(os.path.join(os.getenv("HOME"), '.ssh/id_rsa'))
        self.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        try:
            self.connect(ip, port, user, passwd) if passwd else \
            self.connect(ip, port, user, pkey=private_key)
        except paramiko.ssh_exception.NoValidConnectionsError:
            time.sleep(retry_interval)
            return get_ssh(ip, user, passwd, port, retry - 1, retry_interval)
        return self

    def run(self, cmd, root=False):
        stdin, stdout, stderr = self.exec_command(cmd, get_pty=True)
        if root:
            stdin.write(self.passwd + '\n')
            stdin.flush()
        line = stdout.readline()
        ret = []
        while line:
            logging.info(line)
            ret.append(line)
            line = stdout.readline()
        returncode = stdout.channel.recv_exit_status()
        return returncode, ret
{% endhighlight %}
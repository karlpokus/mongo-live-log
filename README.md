# mongo-live-log
The goal here is to show mongo operations live as you navigate a UI in the browser. Assorted dev tools keeps the console crowded to I'd like to use some notification banner of sorts. `osascript display notification` for OS X fits the bill.

First thing is capturing the mongo operations.

# Solutions

### mongoreplay
Sadly [mongoreplay](https://docs.mongodb.com/manual/reference/program/mongoreplay/) is currently missing from the mongodb packet installed via homebrew. See issue [here](https://github.com/mongodb/mongo-tools/issues/92)

### tcpdump or tshark
```bash
# list devices
$ tcpdump -D
# start capturing traffic on loopback device and save to file
$ sudo tcpdump -i lo0 -n "port 27017" -w traffic.pcap
```
Figuring out how to parse the mess that is `.pcap` is beyond me.

### tail standard mongo logs
```bash
# mongo shell
> db.setLogLevel([0-5] [,component])
# tail the logs
$ tail -f /usr/local/var/log/mongodb/mongo.log | ./tail-to-alert/parser.js # or pipe to grep cmd | notify.sh
```
The default logLevel is 0 and only logs access control. [setLogLevel](https://docs.mongodb.com/manual/reference/method/db.setLogLevel/) > 1 increases the chatty-ness. Still some work to parse it all. The components `query` and `write` looks promising.

### hook into mongoose debug
```js
mongoose.set('debug', notify)
```
Seems like the simplest choice here. See './mongoose-logs' for an example.

# License
MIT

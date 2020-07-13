// winlin.utility.js
import $ from 'jquery'
/**
 * common utilities
 * depends: jquery1.10
 * https://gitee.com/winlinvip/codes/rpn0c2ewbomj81augzk4y59
 * @see: http://blog.csdn.net/win_lin/article/details/17994347
 * v 1.0.20
 */

/**
 * padding the output.
 * padding(3, 5, '0') is 00003
 * padding(3, 5, 'x') is xxxx3
 * @see http://blog.csdn.net/win_lin/article/details/12065413
 */
export function padding(number, length, prefix) {
    if(String(number).length >= length){
        return String(number);
    }
    return padding(prefix+number, length, prefix);
}

/**
 * extends system array, to remove all specified elem.
 * @param arr the array to remove elem from.
 * @param elem the elem to remove.
 * @remark all elem will be removed.
 * for example,
 *      arr = [10, 15, 20, 30, 20, 40]
 *      system_array_remove(arr, 10) // arr=[15, 20, 30, 20, 40]
 *      system_array_remove(arr, 20) // arr=[15, 30, 40]
 */
export function system_array_remove(arr, elem) {
    if (!arr) {
        return;
    }

    var removed = true;
    var i = 0;
    while (removed) {
        removed = false;
        for (; i < arr.length; i++) {
            if (elem == arr[i]) {
                arr.splice(i, 1);
                removed = true;
                break;
            }
        }
    }
}

/**
 * whether the array contains specified element.
 * @param arr the array to find.
 * @param elem_or_function the element value or compare function.
 * @returns true contains elem; otherwise false.
 * for example,
 *      arr = [10, 15, 20, 30, 20, 40]
 *      system_array_contains(arr, 10) // true
 *      system_array_contains(arr, 11) // false
 *      system_array_contains(arr, function(elem){return elem == 30;}); // true
 *      system_array_contains(arr, function(elem){return elem == 60;}); // false
 */
export function system_array_contains(arr, elem_or_function) {
    return system_array_get(arr, elem_or_function) != null;
}

/**
 * get the specified element from array
 * @param arr the array to find.
 * @param elem_or_function the element value or compare function.
 * @returns the matched elem; otherwise null.
 * for example,
 *      arr = [10, 15, 20, 30, 20, 40]
 *      system_array_get(arr, 10) // 10
 *      system_array_get(arr, 11) // null
 *      system_array_get(arr, function(elem){return elem == 30;}); // 30
 *      system_array_get(arr, function(elem){return elem == 60;}); // null
 */
export function system_array_get(arr, elem_or_function) {
    for (var i = 0; i < arr.length; i++) {
        if (typeof elem_or_function == "function") {
            if (elem_or_function(arr[i])) {
                return arr[i];
            }
        } else {
            if (elem_or_function == arr[i]) {
                return arr[i];
            }
        }
    }
    return null;
}

/**
 * to iterate on array.
 * @param arr the array to iterate on.
 * @param pfn the function to apply on it. return false to break loop.
 * for example,
 *      arr = [10, 15, 20, 30, 20, 40]
 *      system_array_foreach(arr, function(elem, index){
 *          console.log('index=' + index + ',elem=' + elem);
 *      });
 * @return true when iterate all elems.
 */
export function system_array_foreach(arr, pfn) {
    if (!pfn) {
        return false;
    }

    for (var i = 0; i < arr.length; i++) {
        if (!pfn(arr[i], i)) {
            return false;
        }
    }

    return true;
}

/**
 * whether the str starts with flag.
 */
export function system_string_startswith(str, flag) {
    if (typeof flag == "object" && flag.constructor == Array) {
        for (var i = 0; i < flag.length; i++) {
            if (system_string_startswith(str, flag[i])) {
                return true;
            }
        }
    }

    return str && flag && str.length >= flag.length && str.indexOf(flag) == 0;
}

/**
 * whether the str ends with flag.
 */
export function system_string_endswith(str, flag) {
    if (typeof flag == "object" && flag.constructor == Array) {
        for (var i = 0; i < flag.length; i++) {
            if (system_string_endswith(str, flag[i])) {
                return true;
            }
        }
    }

    return str && flag && str.length >= flag.length && str.indexOf(flag) == str.length - flag.length;
}

/**
 * trim the start and end of flag in str.
 * @param flag a string to trim.
 */
export function system_string_trim(str, flag) {
    if (!flag || !flag.length || typeof flag != "string") {
        return str;
    }

    while (system_string_startswith(str, flag)) {
        str = str.substr(flag.length);
    }

    while (system_string_endswith(str, flag)) {
        str = str.substr(0, str.length - flag.length);
    }

    return str;
}

/**
 * array sort asc, for example:
 * [a, b] in [10, 11, 9]
 * then sort to: [9, 10, 11]
 * Usage, for example:
 obj.data.data.sort(function(a, b){
            return array_sort_asc(a.metadata.meta_id, b.metadata.meta_id);
        });
 * @see: http://blog.csdn.net/win_lin/article/details/17994347
 * @remark, if need desc, use -1*array_sort_asc(a,b)
 */
export function array_sort_asc(elem_a, elem_b) {
    if (elem_a > elem_b) {
        return 1;
    }
    return (elem_a < elem_b)? -1 : 0;
}
export function array_sort_desc(elem_a, elem_b) {
    return -1 * array_sort_asc(elem_a, elem_b);
}
export function system_array_sort_asc(elem_a, elem_b) {
    return array_sort_asc(elem_a, elem_b);
}
export function system_array_sort_desc(elem_a, elem_b) {
    return -1 * array_sort_asc(elem_a, elem_b);
}

/**
 * parse the query string to object.
 * parse the url location object as: host(hostname:http_port), pathname(dir/filename)
 * for example, url http://192.168.1.168:1980/ui/players.html?vhost=player.vhost.com&app=test&stream=livestream
 * parsed to object:
 {
     host        : "192.168.1.168:1980",
     hostname    : "192.168.1.168",
     http_port   : 1980,
     pathname    : "/ui/players.html",
     dir         : "/ui",
     filename    : "/players.html",

     vhost       : "player.vhost.com",
     app         : "test",
     stream      : "livestream"
 }
 * @see: http://blog.csdn.net/win_lin/article/details/17994347
 */
export function parse_query_string(){
    var obj = {};

    // add the uri object.
    // parse the host(hostname:http_port), pathname(dir/filename)
    obj.host = window.location.host;
    obj.hostname = window.location.hostname;
    obj.http_port = (window.location.port == "")? 80:window.location.port;
    obj.pathname = window.location.pathname;
    if (obj.pathname.lastIndexOf("/") <= 0) {
        obj.dir = "/";
        obj.filename = "";
    } else {
        obj.dir = obj.pathname.substr(0, obj.pathname.lastIndexOf("/"));
        obj.filename = obj.pathname.substr(obj.pathname.lastIndexOf("/"));
    }

    // pure user query object.
    obj.user_query = {};

    // parse the query string.
    var query_string = String(window.location.search).replace(" ", "").split("?")[1];
    if(query_string == undefined){
        query_string = String(window.location.hash).replace(" ", "").split("#")[1];
        if(query_string == undefined){
            return obj;
        }
    }

    __fill_query(query_string, obj);

    return obj;
}

export function __fill_query(query_string, obj) {
    // pure user query object.
    obj.user_query = {};

    if (query_string.length == 0) {
        return;
    }

    // split again for angularjs.
    if (query_string.indexOf("?") >= 0) {
        query_string = query_string.split("?")[1];
    }

    var queries = query_string.split("&");
    for (var i = 0; i < queries.length; i++) {
        var elem = queries[i];

        var query = elem.split("=");
        obj[query[0]] = query[1];
        obj.user_query[query[0]] = query[1];
    }

    // alias domain for vhost.
    if (obj.domain) {
        obj.vhost = obj.domain;
    }
}

/**
 * parse the rtmp url,
 * for example: rtmp://demo.srs.com:1935/live...vhost...players/livestream
 * @return object {server, port, vhost, app, stream}
 * for exmaple, rtmp_url is rtmp://demo.srs.com:1935/live...vhost...players/livestream
 * parsed to object:
 {
    server: "demo.srs.com",
    port: 1935,
    vhost: "players",
    app: "live",
    stream: "livestream"
 }
 */
export function parse_rtmp_url(rtmp_url) {
    // @see: http://stackoverflow.com/questions/10469575/how-to-use-location-object-to-parse-url-without-redirecting-the-page-in-javascri
    var a = document.createElement("a");
    a.href = rtmp_url.replace("rtmp://", "http://")
        .replace("webrtc://", "http://")
        .replace("rtc://", "http://");

    var vhost = a.hostname;
    var app = a.pathname.substr(1, a.pathname.lastIndexOf("/") - 1);
    var stream = a.pathname.substr(a.pathname.lastIndexOf("/") + 1);

    // parse the vhost in the params of app, that srs supports.
    app = app.replace("...vhost...", "?vhost=");
    if (app.indexOf("?") >= 0) {
        var params = app.substr(app.indexOf("?"));
        app = app.substr(0, app.indexOf("?"));

        if (params.indexOf("vhost=") > 0) {
            vhost = params.substr(params.indexOf("vhost=") + "vhost=".length);
            if (vhost.indexOf("&") > 0) {
                vhost = vhost.substr(0, vhost.indexOf("&"));
            }
        }
    }

    // when vhost equals to server, and server is ip,
    // the vhost is __defaultVhost__
    if (a.hostname == vhost) {
        var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
        if (re.test(a.hostname)) {
            vhost = "__defaultVhost__";
        }
    }

    // parse the schema
    var schema = "rtmp";
    if (rtmp_url.indexOf("://") > 0) {
        schema = rtmp_url.substr(0, rtmp_url.indexOf("://"));
    }

    var port = a.port;
    if (!port) {
        if (schema === 'http') {
            port = 80;
        } else if (schema === 'https') {
            port = 443;
        } else if (schema === 'rtmp') {
            port = 1935;
        } else if (schema === 'webrtc' || schema === 'rtc') {
            port = 1985;
        }
    }

    var ret = {
        url: rtmp_url,
        schema: schema,
        server: a.hostname, port: port,
        vhost: vhost, app: app, stream: stream
    };
    __fill_query(a.search, ret);

    return ret;
}

/**
 * get the agent.
 * @return an object specifies some browser.
 *   for example, get_browser_agents().MSIE
 * @see: http://blog.csdn.net/win_lin/article/details/17994347
 */
export function get_browser_agents() {
    var agent = navigator.userAgent;

    /**
     WindowsPC platform, Win7:
     chrome 31.0.1650.63:
     Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36
     (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36
     firefox 23.0.1:
     Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101
     Firefox/23.0
     safari 5.1.7(7534.57.2):
     Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2
     (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2
     opera 15.0.1147.153:
     Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36
     (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.36
     OPR/15.0.1147.153
     360 6.2.1.272:
     Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64;
     Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729;
     .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; .NET4.0C;
     .NET4.0E)
     IE 10.0.9200.16750(update: 10.0.12):
     Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64;
     Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729;
     .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; .NET4.0C;
     .NET4.0E)
     */

    return {
        // platform
        Android: agent.indexOf("Android") != -1,
        Windows: agent.indexOf("Windows") != -1,
        iPhone: agent.indexOf("iPhone") != -1,
        // Windows Browsers
        Chrome: agent.indexOf("Chrome") != -1,
        Firefox: agent.indexOf("Firefox") != -1,
        QQBrowser: agent.indexOf("QQBrowser") != -1,
        MSIE: agent.indexOf("MSIE") != -1,
        // Android Browsers
        Opera: agent.indexOf("Presto") != -1,
        MQQBrowser: agent.indexOf("MQQBrowser") != -1
    };
}

/**
 * format relative seconds to HH:MM:SS,
 * for example, 210s formated to 00:03:30
 * @see: http://blog.csdn.net/win_lin/article/details/17994347
 * @usage relative_seconds_to_HHMMSS(210)
 */
export function relative_seconds_to_HHMMSS(seconds){
    var date = new Date();
    date.setTime(Number(seconds) * 1000);

    var ret = padding(date.getUTCHours(), 2, '0')
        + ":" + padding(date.getUTCMinutes(), 2, '0')
        + ":" + padding(date.getUTCSeconds(), 2, '0');

    return ret;
}

/**
 * format absolute seconds to HH:MM:SS,
 * for example, 1389146480s (2014-01-08 10:01:20 GMT+0800) formated to 10:01:20
 * @see: http://blog.csdn.net/win_lin/article/details/17994347
 * @usage absolute_seconds_to_HHMMSS(new Date().getTime() / 1000)
 */
export function absolute_seconds_to_HHMMSS(seconds){
    var date = new Date();
    date.setTime(Number(seconds) * 1000);

    var ret = padding(date.getHours(), 2, '0')
        + ":" + padding(date.getMinutes(), 2, '0')
        + ":" + padding(date.getSeconds(), 2, '0');

    return ret;
}

/**
 * format absolute seconds to YYYY-mm-dd,
 * for example, 1389146480s (2014-01-08 10:01:20 GMT+0800) formated to 2014-01-08
 * @see: http://blog.csdn.net/win_lin/article/details/17994347
 * @usage absolute_seconds_to_YYYYmmdd(new Date().getTime() / 1000)
 */
export function absolute_seconds_to_YYYYmmdd(seconds) {
    var date = new Date();
    date.setTime(Number(seconds) * 1000);

    var ret = date.getFullYear()
        + "-" + padding(date.getMonth() + 1, 2, '0')
        + "-" + padding(date.getDate(), 2, '0');

    return ret;
}

/**
 * parse the date in str to Date object.
 * @param str the date in str, format as "YYYY-mm-dd", for example, 2014-12-11
 * @returns a date object.
 * @usage YYYYmmdd_parse("2014-12-11")
 */
export function YYYYmmdd_parse(str) {
    var date = new Date();
    date.setTime(Date.parse(str));
    return date;
}

/**
 * async refresh function call. to avoid multiple call.
 * @remark AsyncRefresh is for jquery to refresh the speicified pfn in a page;
 *      if angularjs, use AsyncRefresh2 to change pfn, cancel previous request for angularjs use singleton object.
 * @param refresh_interval the default refresh interval ms.
 * @see: http://blog.csdn.net/win_lin/article/details/17994347
 * the pfn can be implements as following:
 var async_refresh = new AsyncRefresh(pfn, 3000);
 function pfn() {
            if (!async_refresh.refresh_is_enabled()) {
                async_refresh.request(100);
                return;
            }
            $.ajax({
                type: 'GET', async: true, url: 'xxxxx',
                complete: function(){
                    if (!async_refresh.refresh_is_enabled()) {
                        async_refresh.request(0);
                    } else {
                        async_refresh.request(async_refresh.refresh_interval);
                    }
                },
                success: function(res){
                    // if donot allow refresh, directly return.
                    if (!async_refresh.refresh_is_enabled()) {
                        return;
                    }

                    // render the res.
                }
            });
        }
 */
export function AsyncRefresh(pfn, refresh_interval) {
    this.refresh_interval = refresh_interval;

    this.__handler = null;
    this.__pfn = pfn;

    this.__enabled = true;
}
/**
 * disable the refresher, the pfn must check the refresh state.
 */
AsyncRefresh.prototype.refresh_disable = function() {
    this.__enabled = false;
}
AsyncRefresh.prototype.refresh_enable = function() {
    this.__enabled = true;
}
AsyncRefresh.prototype.refresh_is_enabled = function() {
    return this.__enabled;
}
/**
 * start new async request
 * @param timeout the timeout in ms.
 *      user can use the refresh_interval of the AsyncRefresh object,
 *      which initialized in constructor.
 */
AsyncRefresh.prototype.request = function(timeout) {
    if (this.__handler) {
        clearTimeout(this.__handler);
    }

    this.__handler = setTimeout(this.__pfn, timeout);
}

/**
 * async refresh v2, support cancellable refresh, and change the refresh pfn.
 * @remakr for angularjs. if user only need jquery, maybe AsyncRefresh is better.
 * @see: http://blog.csdn.net/win_lin/article/details/17994347
 * Usage:
 bsmControllers.controller('CServers', ['$scope', 'MServer', function($scope, MServer){
            async_refresh2.refresh_change(function(){
                // 获取服务器列表
                MServer.servers_load({}, function(data){
                    $scope.servers = data.data.servers;
                    async_refresh2.request();
                });
            }, 3000);

            async_refresh2.request(0);
        }]);
 bsmControllers.controller('CStreams', ['$scope', 'MStream', function($scope, MStream){
            async_refresh2.refresh_change(function(){
                // 获取流列表
                MStream.streams_load({}, function(data){
                    $scope.streams = data.data.streams;
                    async_refresh2.request();
                });
            }, 3000);

            async_refresh2.request(0);
        }]);
 */
export function AsyncRefresh2() {
    /**
     * the function callback before call the pfn.
     * the protype is function():bool, which return true to invoke, false to abort the call.
     * null to ignore this callback.
     *
     * for example, user can abort the refresh by find the class popover:
     *      async_refresh2.on_before_call_pfn = function() {
     *          if ($(".popover").length > 0) {
     *              async_refresh2.request();
     *              return false;
     *          }
     *          return true;
     *      };
     */
    this.on_before_call_pfn = null;

    // use a anonymous function to call, and check the enabled when actually invoke.
    this.__call = {
        pfn: null,
        timeout: 0,
        __enabled: false,
        __handler: null
    };
}
// singleton
var async_refresh2 = new AsyncRefresh2();
/**
 * initialize or refresh change. cancel previous request, setup new request.
 * @param pfn a function():void to request after timeout. null to disable refresher.
 * @param timeout the timeout in ms, to call pfn. null to disable refresher.
 */
AsyncRefresh2.prototype.initialize = function(pfn, timeout) {
    this.refresh_change(pfn, timeout);
}
/**
 * stop refresh, the refresh pfn is set to null.
 */
AsyncRefresh2.prototype.stop = function() {
    this.__call.__enabled = false;
}
/**
 * restart refresh, use previous config.
 */
AsyncRefresh2.prototype.restart = function() {
    this.__call.__enabled = true;
    this.request(0);
}
/**
 * change refresh pfn, the old pfn will set to disabled.
 */
AsyncRefresh2.prototype.refresh_change = function(pfn, timeout) {
    // cancel the previous call.
    if (this.__call.__handler) {
        clearTimeout(this.__handler);
    }
    this.__call.__enabled = false;

    // setup new call.
    this.__call = {
        pfn: pfn,
        timeout: timeout,
        __enabled: true,
        __handler: null
    };
}
/**
 * start new request, we never auto start the request,
 * user must start new request when previous completed.
 * @param timeout [optional] if not specified, use the timeout in initialize or refresh_change.
 */
AsyncRefresh2.prototype.request = function(timeout) {
    var self = this;
    var this_call = this.__call;

    // clear previous timeout.
    if (this_call.__handler) {
        clearTimeout(this_call.__handler);
    }

    // override the timeout
    if (timeout == undefined) {
        timeout = this_call.timeout;
    }

    // if user disabled refresher.
    if (this_call.pfn == null || timeout == null) {
        return;
    }

    this_call.__handler = setTimeout(function(){
        // cancelled by refresh_change, ignore.
        if (!this_call.__enabled) {
            return;
        }

        // callback if the handler installled.
        if (self.on_before_call_pfn) {
            if (!self.on_before_call_pfn()) {
                return;
            }
        }

        // do the actual call.
        this_call.pfn();
    }, timeout);
}

// other components.
/**
 * jquery/bootstrap pager.
 * depends: jquery1.10, boostrap2
 * https://code.csdn.net/snippets/146160
 * @see: http://blog.csdn.net/win_lin/article/details/17628631
 */







//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// to query the swf anti cache.
export function  srs_get_version_code() { return "1.33"; }

/**
 * player specified size.
 */
export function  srs_get_player_modal() { return 740; }
export function  srs_get_player_width() { return srs_get_player_modal() - 30; }
export function  srs_get_player_height() { return srs_get_player_width() * 9 / 19; }

// get the default vhost for players.
export function  srs_get_player_vhost() { return "players"; }
// the api server port, for chat room.
export function  srs_get_api_server_port() { return 8085; }
// the srs http server port
export function  srs_get_srs_http_server_port() { return 8080; }

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

/**
 * update the navigator, add same query string.
 */
function update_nav() {
    // $("#srs_index").attr("href", "index.html" + window.location.search);
    // $("#nav_srs_player").attr("href", "srs_player.html" + window.location.search);
    // $("#nav_rtc_player").attr("href", "rtc_player.html" + window.location.search);
    // $("#nav_rtc_publisher").attr("href", "rtc_publisher.html" + window.location.search);
    // $("#nav_srs_publisher").attr("href", "srs_publisher.html" + window.location.search);
    // $("#nav_srs_chat").attr("href", "srs_chat.html" + window.location.search);
    // $("#nav_srs_bwt").attr("href", "srs_bwt.html" + window.location.search);
    // $("#nav_jwplayer6").attr("href", "jwplayer6.html" + window.location.search);
    // $("#nav_osmf").attr("href", "osmf.html" + window.location.search);
    // $("#nav_vlc").attr("href", "vlc.html" + window.location.search);
}

// Special extra params, such as auth_key.
export function  user_extra_params(query, params) {
    var queries = params || [];
    var server = (query.server == undefined)? window.location.hostname:query.server;
    var vhost = (query.vhost == undefined)? window.location.hostname:query.vhost;

    // Note that ossrs.net provides only web service,
    // that is migrating to r.ossrs.net
    if (vhost == "ossrs.net") {
        vhost = "r.ossrs.net";
    }
    if (server == "ossrs.net") {
        server = "r.ossrs.net";
    }

    for (var key in query.user_query) {
        if (key === 'app' || key === 'autostart' || key === 'dir'
            || key === 'filename' || key === 'host' || key === 'hostname'
            || key === 'http_port' || key === 'pathname' || key === 'port'
            || key === 'server' || key === 'stream' || key === 'buffer'
            || key === 'schema' || key === 'vhost' || key === 'api'
        ) {
            continue;
        }

        if (query[key]) {
            queries.push(key + '=' + query[key]);
        }
    }

    return queries;
}

/**
 @param server the ip of server. default to window.location.hostname
 @param vhost the vhost of rtmp. default to window.location.hostname
 @param port the port of rtmp. default to 1935
 @param app the app of rtmp. default to live.
 @param stream the stream of rtmp. default to livestream.
 */
export function  build_default_rtmp_url() {
    var query = parse_query_string();

    var schema = (!query.schema)? "rtmp":query.schema;
    var server = (!query.server)? window.location.hostname:query.server;
    var port = (!query.port)? schema=="http"?80:1935:query.port;
    var vhost = (!query.vhost)? window.location.hostname:query.vhost;
    var app = (!query.app)? "live":query.app;
    var stream = (!query.stream)? "livestream":query.stream;

    // Note that ossrs.net provides only web service,
    // that is migrating to r.ossrs.net
    if (vhost == "ossrs.net") {
        vhost = "r.ossrs.net";
    }
    if (server == "ossrs.net") {
        server = "r.ossrs.net";
    }

    var queries = [];
    if (server != vhost && vhost != "__defaultVhost__") {
        queries.push("vhost=" + vhost);
    }
    queries = user_extra_params(query, queries);

    var uri = schema + "://" + server + ":" + port + "/" + app + "/" + stream + "?" + queries.join('&');
    while (uri.indexOf("?") == uri.length - 1) {
        uri = uri.substr(0, uri.length - 1);
    }

    return uri;
}
// for the chat to init the publish url.
export function  build_default_publish_rtmp_url() {
    var query = parse_query_string();

    var schema = (!query.schema)? "rtmp":query.schema;
    var server = (!query.server)? window.location.hostname:query.server;
    var port = (!query.port)? schema=="http"?80:1935:query.port;
    var vhost = (!query.vhost)? window.location.hostname:query.vhost;
    var app = (!query.app)? "live":query.app;
    var stream = (!query.stream)? "demo":query.stream;

    // Note that ossrs.net provides only web service,
    // that is migrating to r.ossrs.net
    if (vhost == "ossrs.net") {
        vhost = "r.ossrs.net";
    }
    if (server == "ossrs.net") {
        server = "r.ossrs.net";
    }

    var queries = [];
    if (server != vhost && vhost != "__defaultVhost__") {
        queries.push("vhost=" + vhost);
    }
    if (query.shp_identify) {
        queries.push("shp_identify=" + query.shp_identify);
    }

    var uri = schema + "://" + server + ":" + port + "/" + app + "/" + stream + "?" + queries.join('&');
    while (uri.indexOf("?") == uri.length - 1) {
        uri = uri.substr(0, uri.length - 1);
    }

    return uri;
}
// for the bandwidth tool to init page
export function  build_default_bandwidth_rtmp_url() {
    var query = parse_query_string();

    var server = (!query.server)? window.location.hostname:query.server;
    var port = (!query.port)? 1935:query.port;
    var vhost = "bandcheck.srs.com";
    var app = (!query.app)? "app":query.app;
    var key = (!query.key)? "35c9b402c12a7246868752e2878f7e0e":query.key;

    // Note that ossrs.net provides only web service,
    // that is migrating to r.ossrs.net
    if (vhost == "ossrs.net") {
        vhost = "r.ossrs.net";
    }
    if (server == "ossrs.net") {
        server = "r.ossrs.net";
    }

    return "rtmp://" + server + ":" + port + "/" + app + "?key=" + key + "&vhost=" + vhost;
}

/**
 @param server the ip of server. default to window.location.hostname
 @param vhost the vhost of hls. default to window.location.hostname
 @param hls_vhost the vhost of hls. override the server if specified.
 @param hls_port the port of hls. default to window.location.port
 @param app the app of hls. default to live.
 @param stream the stream of hls. default to livestream.
 */
export function  build_default_hls_url() {
    var query = parse_query_string();

    // Note that ossrs.net provides only web service,
    // that is migrating to r.ossrs.net
    if (query.hls_vhost == "ossrs.net") {
        query.hls_vhost = "r.ossrs.net";
    }

    // for http, use hls_vhost to override server if specified.
    var server = window.location.hostname;
    if (query.server != undefined) {
        server = query.server;
    } else if (query.hls_vhost != undefined) {
        server = query.hls_vhost;
    }

    var port = (!query.hls_port)? window.location.port:query.hls_port;
    var app = (!query.app)? "live":query.app;
    var stream = (!query.stream)? "demo":query.stream;

    if (!port) {
        port = 8080;
    }

    if (stream.indexOf(".flv") >= 0) {
        return "http://" + server + ":" + port + "/" + app + "/" + stream;
    }
    return "http://" + server + ":" + port + "/" + app + "/" + stream + ".m3u8";
}

export function  build_default_rtc_url(query) {
    // Use target to overwrite server, vhost and eip.
    console.log('?target=x.x.x.x to overwrite server, vhost and eip.');
    if (query.target) {
        query.server = query.vhost = query.eip = query.target;
        query.user_query.eip = query.target;
        delete query.target;
    }

    var server = (!query.server)? window.location.hostname:query.server;
    var vhost = (!query.vhost)? window.location.hostname:query.vhost;
    var app = (!query.app)? "live":query.app;
    var stream = (!query.stream)? "livestream":query.stream;
    var api = query.api? ':'+query.api : '';

    // Note that ossrs.net provides only web service,
    // that is migrating to r.ossrs.net
    if (vhost == "ossrs.net") {
        vhost = "r.ossrs.net";
    }
    if (server == "ossrs.net") {
        server = "r.ossrs.net";
    }

    var queries = [];
    if (server != vhost && vhost != "__defaultVhost__") {
        queries.push("vhost=" + vhost);
    }
    queries = user_extra_params(query, queries);

    var uri = "webrtc://" + server + api + "/" + app + "/" + stream + "?" + queries.join('&');
    while (uri.lastIndexOf("?") == uri.length - 1) {
        uri = uri.substr(0, uri.length - 1);
    }

    return uri;
};

/**
 * initialize the page.
 * @param rtmp_url the div id contains the rtmp stream url to play
 * @param hls_url the div id contains the hls stream url to play
 * @param modal_player the div id contains the modal player
 */
export function  srs_init_rtmp(rtmp_url, modal_player) {
    srs_init(rtmp_url, null, modal_player);
}
export function  srs_init_hls(hls_url, modal_player) {
    srs_init(null, hls_url, modal_player);
}
export function  srs_init_rtc(id, query) {
    update_nav();
    $(id).val(build_default_rtc_url(query));
}
export function  srs_init(rtmp_url, hls_url, modal_player) {
    update_nav();

    if (rtmp_url) {
        $(rtmp_url).val(build_default_rtmp_url());
    }
    if (hls_url) {
        $(hls_url).val(build_default_hls_url());
    }
    if (modal_player) {
        $(modal_player).width(srs_get_player_modal() + "px");
        $(modal_player).css("margin-left", "-" + srs_get_player_modal() / 2 +"px");
    }
}
// for the chat to init the publish url.
export function  srs_init_publish(rtmp_url) {
    update_nav();

    if (rtmp_url) {
        $(rtmp_url).val(build_default_publish_rtmp_url());
    }
}
// for bw to init url
// url: scheme://host:port/path?query#fragment
export function  srs_init_bwt(rtmp_url, hls_url) {
    update_nav();

    if (rtmp_url) {
        $(rtmp_url).val(build_default_bandwidth_rtmp_url());
    }
}

// check whether can republish
export function  srs_can_republish() {
    var browser = get_browser_agents();

    if (browser.Chrome || browser.Firefox) {
        return true;
    }

    if (browser.MSIE || browser.QQBrowser) {
        return false;
    }

    return false;
}

// without default values set.
export function  srs_initialize_codec_page(
    cameras, microphones,
    sl_cameras, sl_microphones, sl_vcodec, sl_profile, sl_level, sl_gop, sl_size, sl_fps, sl_bitrate,
    sl_acodec
) {
    $(sl_cameras).empty();
    for (var i = 0; i < cameras.length; i++) {
        $(sl_cameras).append("<option value='" + i + "'>" + cameras[i] + "</option");
    }
    var matchs;
    // optional: select the except matches
    matchs = ["virtual"];
    for (var i = 0; i < cameras.length; i++) {
        for (var j = 0; j < matchs.length; j++) {
            if (cameras[i].toLowerCase().indexOf(matchs[j]) == -1) {
                $(sl_cameras + " option[value='" + i + "']").attr("selected", true);
                break;
            }
        }
        if (j < matchs.length) {
            break;
        }
    }
    // optional: select the first matched.
    matchs = ["truevision", "integrated"];
    for (var i = 0; i < cameras.length; i++) {
        for (var j = 0; j < matchs.length; j++) {
            if (cameras[i].toLowerCase().indexOf(matchs[j]) >= 0) {
                $(sl_cameras + " option[value='" + i + "']").attr("selected", true);
                break;
            }
        }
        if (j < matchs.length) {
            break;
        }
    }

    $(sl_microphones).empty();
    for (var i = 0; i < microphones.length; i++) {
        $(sl_microphones).append("<option value='" + i + "'>" + microphones[i] + "</option");
    }
    // optional: select the except matches
    matchs = ["default"];
    for (var i = 0; i < microphones.length; i++) {
        for (var j = 0; j < matchs.length; j++) {
            if (microphones[i].toLowerCase().indexOf(matchs[j]) == -1) {
                $(sl_microphones + " option[value='" + i + "']").attr("selected", true);
                break;
            }
        }
        if (j < matchs.length) {
            break;
        }
    }
    // optional: select the first matched.
    matchs = ["realtek", "内置式麦克风"];
    for (var i = 0; i < microphones.length; i++) {
        for (var j = 0; j < matchs.length; j++) {
            if (microphones[i].toLowerCase().indexOf(matchs[j]) >= 0) {
                $(sl_microphones + " option[value='" + i + "']").attr("selected", true);
                break;
            }
        }
        if (j < matchs.length) {
            break;
        }
    }

    $(sl_vcodec).empty();
    var vcodecs = ["h264", "vp6"];
    vcodecs = ["h264"]; // h264 only.
    for (var i = 0; i < vcodecs.length; i++) {
        $(sl_vcodec).append("<option value='" + vcodecs[i] + "'>" + vcodecs[i] + "</option");
    }

    $(sl_profile).empty();
    var profiles = ["baseline", "main"];
    for (var i = 0; i < profiles.length; i++) {
        $(sl_profile).append("<option value='" + profiles[i] + "'>" + profiles[i] + "</option");
    }

    $(sl_level).empty();
    var levels = ["1", "1b", "1.1", "1.2", "1.3",
        "2", "2.1", "2.2", "3", "3.1", "3.2", "4", "4.1", "4.2", "5", "5.1"];
    for (var i = 0; i < levels.length; i++) {
        $(sl_level).append("<option value='" + levels[i] + "'>" + levels[i] + "</option");
    }

    $(sl_gop).empty();
    var gops = ["0.3", "0.5", "1", "2", "3", "4",
        "5", "6", "7", "8", "9", "10", "15", "20"];
    for (var i = 0; i < gops.length; i++) {
        $(sl_gop).append("<option value='" + gops[i] + "'>" + gops[i] + "秒</option");
    }

    $(sl_size).empty();
    var sizes = ["176x144", "320x240", "352x240",
        "352x288", "480x360", "640x480", "720x480", "720x576", "800x600",
        "1024x768", "1280x720", "1360x768", "1920x1080"];
    for (i = 0; i < sizes.length; i++) {
        $(sl_size).append("<option value='" + sizes[i] + "'>" + sizes[i] + "</option");
    }

    $(sl_fps).empty();
    var fpses = ["5", "10", "15", "20", "24", "25", "29.97", "30"];
    for (i = 0; i < fpses.length; i++) {
        $(sl_fps).append("<option value='" + fpses[i] + "'>" + Number(fpses[i]).toFixed(2) + " 帧/秒</option");
    }

    $(sl_bitrate).empty();
    var bitrates = ["50", "200", "350", "500", "650", "800",
        "950", "1000", "1200", "1500", "1800", "2000", "3000", "5000"];
    for (i = 0; i < bitrates.length; i++) {
        $(sl_bitrate).append("<option value='" + bitrates[i] + "'>" + bitrates[i] + " kbps</option");
    }

    $(sl_acodec).empty();
    var bitrates = ["speex", "nellymoser", "pcma", "pcmu"];
    for (i = 0; i < bitrates.length; i++) {
        $(sl_acodec).append("<option value='" + bitrates[i] + "'>" + bitrates[i] + "</option");
    }
}
/**
 * when publisher ready, init the page elements.
 */
export function  srs_publisher_initialize_page(
    cameras, microphones,
    sl_cameras, sl_microphones, sl_vcodec, sl_profile, sl_level, sl_gop, sl_size, sl_fps, sl_bitrate,
    sl_acodec
) {
    srs_initialize_codec_page(
        cameras, microphones,
        sl_cameras, sl_microphones, sl_vcodec, sl_profile, sl_level, sl_gop, sl_size, sl_fps, sl_bitrate,
        sl_acodec
    );

    //var profiles = ["baseline", "main"];
    $(sl_profile + " option[value='main']").attr("selected", true);

    //var levels = ["1", "1b", "1.1", "1.2", "1.3",
    //    "2", "2.1", "2.2", "3", "3.1", "3.2", "4", "4.1", "4.2", "5", "5.1"];
    $(sl_level + " option[value='4.1']").attr("selected", true);

    //var gops = ["0.3", "0.5", "1", "2", "3", "4",
    //    "5", "6", "7", "8", "9", "10", "15", "20"];
    $(sl_gop + " option[value='10']").attr("selected", true);

    //var sizes = ["176x144", "320x240", "352x240",
    //    "352x288", "480x360", "640x480", "720x480", "720x576", "800x600",
    //    "1024x768", "1280x720", "1360x768", "1920x1080"];
    $(sl_size + " option[value='640x480']").attr("selected", true);

    //var fpses = ["5", "10", "15", "20", "24", "25", "29.97", "30"];
    $(sl_fps + " option[value='20']").attr("selected", true);

    //var bitrates = ["50", "200", "350", "500", "650", "800",
    //    "950", "1000", "1200", "1500", "1800", "2000", "3000", "5000"];
    $(sl_bitrate + " option[value='500']").attr("selected", true);

    // speex
    $(sl_acodec + " option[value='speex']").attr("selected", true);
}
/**
 * for chat, use low latecy settings.
 */
export function  srs_chat_initialize_page(
    cameras, microphones,
    sl_cameras, sl_microphones, sl_vcodec, sl_profile, sl_level, sl_gop, sl_size, sl_fps, sl_bitrate,
    sl_acodec
) {
    srs_initialize_codec_page(
        cameras, microphones,
        sl_cameras, sl_microphones, sl_vcodec, sl_profile, sl_level, sl_gop, sl_size, sl_fps, sl_bitrate,
        sl_acodec
    );

    //var profiles = ["baseline", "main"];
    $(sl_profile + " option[value='baseline']").attr("selected", true);

    //var levels = ["1", "1b", "1.1", "1.2", "1.3",
    //    "2", "2.1", "2.2", "3", "3.1", "3.2", "4", "4.1", "4.2", "5", "5.1"];
    $(sl_level + " option[value='3.1']").attr("selected", true);

    //var gops = ["0.3", "0.5", "1", "2", "3", "4",
    //    "5", "6", "7", "8", "9", "10", "15", "20"];
    $(sl_gop + " option[value='2']").attr("selected", true);

    //var sizes = ["176x144", "320x240", "352x240",
    //    "352x288", "480x360", "640x480", "720x480", "720x576", "800x600",
    //    "1024x768", "1280x720", "1360x768", "1920x1080"];
    $(sl_size + " option[value='480x360']").attr("selected", true);

    //var fpses = ["5", "10", "15", "20", "24", "25", "29.97", "30"];
    $(sl_fps + " option[value='15']").attr("selected", true);

    //var bitrates = ["50", "200", "350", "500", "650", "800",
    //    "950", "1000", "1200", "1500", "1800", "2000", "3000", "5000"];
    $(sl_bitrate + " option[value='350']").attr("selected", true);

    // speex
    $(sl_acodec + " option[value='speex']").attr("selected", true);
}
/**
 * get the vcodec and acodec.
 */
export function  srs_publiser_get_codec(
    vcodec, acodec,
    sl_cameras, sl_microphones, sl_vcodec, sl_profile, sl_level, sl_gop, sl_size, sl_fps, sl_bitrate,
    sl_acodec
) {
    acodec.codec       = $(sl_acodec).val();
    acodec.device_code = $(sl_microphones).val();
    acodec.device_name = $(sl_microphones).text();

    vcodec.device_code = $(sl_cameras).find("option:selected").val();
    vcodec.device_name = $(sl_cameras).find("option:selected").text();

    vcodec.codec    = $(sl_vcodec).find("option:selected").val();
    vcodec.profile  = $(sl_profile).find("option:selected").val();
    vcodec.level    = $(sl_level).find("option:selected").val();
    vcodec.fps      = $(sl_fps).find("option:selected").val();
    vcodec.gop      = $(sl_gop).find("option:selected").val();
    vcodec.size     = $(sl_size).find("option:selected").val();
    vcodec.bitrate  = $(sl_bitrate).find("option:selected").val();
}




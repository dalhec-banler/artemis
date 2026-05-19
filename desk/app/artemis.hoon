/-  *artemis
/+  artemis
/+  default-agent, dbug
::
|%
+$  old-mon
  $:  who=@p
      pub=@ud
      sec=@ud
      lif=@ud
      rif=@ud
      sed=@ux
      dat=@da
      tag=(list @tas)
  ==
+$  versioned-state
  $%  state-0
      state-1
  ==
+$  state-0  $:
  %0
  mons=(list old-mon)
  ==
+$  state-1  $:
  %1
  mons=(map @p mon)
  ==
+$  card  card:agent:gall
--
%-  agent:dbug
=|  state-1
=*  state  -
^-  agent:gall
=<
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %|) bowl)
    hc    ~(. +> bowl)
::
++  on-init
  ^-  (quip card _this)
  :_  this
  :~  [%pass /eyre %arvo %e %connect [~ /apps/artemis] dap.bowl]
  ==
++  on-save  !>(state)
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state old-state)
  =/  bind-card=card
    [%pass /eyre %arvo %e %connect [~ /apps/artemis] dap.bowl]
  ?-  -.old
    %1  [[bind-card ~] this(state old)]
    %0
      =/  new-mons=(map @p mon)
        %-  ~(gas by *(map @p mon))
        %+  turn  mons.old
        |=  o=old-mon
        :-  who.o
        :*  who.o  ''  %personal
            pub.o  sec.o  lif.o  rif.o
            sed.o  dat.o  tag.o
        ==
      [[bind-card ~] this(state [%1 new-mons])]
  ==
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+  mark  (on-poke:def mark vase)
      %noun  `this
      %handle-http-request
    =+  !<([eyre-id=@ta =inbound-request:eyre] vase)
    :_  this
    (handle-http:hc eyre-id inbound-request)
      %artemis-action
    =/  act  !<(action vase)
    ?.  =(src.bowl our.bowl)  `this
    ?-  -.act
        %make-moon
      =/  mun  (bar-moon:artemis bowl nam.act rol.act)
      ?~  mun  `this
      =/  m=mon  u.mun
      =.  mons.state  (~(put by mons.state) who.m m)
      :_  this
      :~  (jael-moon:artemis m)
          (give-fact:hc mons.state)
      ==
        %rekey-moon
      =/  m=(unit mon)  (~(get by mons.state) who.act)
      ?~  m  `this
      =/  new=mon  (bar-moon-cycle-keys:artemis bowl u.m)
      =.  mons.state  (~(put by mons.state) who.act new)
      :_  this
      :~  (jael-moon:artemis new)
          (give-fact:hc mons.state)
      ==
        %breach-moon
      =/  rft=@ud  (bar-moon-breach:artemis bowl who.act)
      =/  m=(unit mon)  (~(get by mons.state) who.act)
      ?~  m  `this
      =.  rif.u.m  rft
      =.  mons.state  (~(put by mons.state) who.act u.m)
      :_  this
      :~  (jael-moon-breach:artemis who.act rft)
          (give-fact:hc mons.state)
      ==
        %forget-moon
      =.  mons.state  (~(del by mons.state) who.act)
      :_  this  :~  (give-fact:hc mons.state)  ==
        %name-moon
      =/  m=(unit mon)  (~(get by mons.state) who.act)
      ?~  m  `this
      =.  nam.u.m  nam.act
      =.  mons.state  (~(put by mons.state) who.act u.m)
      :_  this  :~  (give-fact:hc mons.state)  ==
        %set-role
      =/  m=(unit mon)  (~(get by mons.state) who.act)
      ?~  m  `this
      =.  rol.u.m  rol.act
      =.  mons.state  (~(put by mons.state) who.act u.m)
      :_  this  :~  (give-fact:hc mons.state)  ==
        %add-tag
      =/  m=(unit mon)  (~(get by mons.state) who.act)
      ?~  m  `this
      =.  tag.u.m  (snoc tag.u.m tag.act)
      =.  mons.state  (~(put by mons.state) who.act u.m)
      :_  this  :~  (give-fact:hc mons.state)  ==
        %del-tag
      =/  m=(unit mon)  (~(get by mons.state) who.act)
      ?~  m  `this
      =/  fund  (find ~[tag.act] tag.u.m)
      ?~  fund  `this
      =.  tag.u.m  (oust [u.fund 1] tag.u.m)
      =.  mons.state  (~(put by mons.state) who.act u.m)
      :_  this  :~  (give-fact:hc mons.state)  ==
    ==
  ==
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+  path  (on-watch:def path)
      [%moons ~]
    :_  this  :~  (give-fact:hc mons.state)  ==
      [%http-response *]
    `this
  ==
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+  path  (on-peek:def path)
      [%x %get @ ~]
    =/  who=ship  (slav %p i.t.t.path)
    ``noun+!>((~(get by mons.state) who))
      [%x %mons ~]
    ``noun+!>(mons.state)
  ==
++  on-leave  on-leave:def
++  on-agent  on-agent:def
++  on-arvo
  |=  [=wire sign=sign-arvo]
  ^-  (quip card _this)
  ?+  wire  (on-arvo:def wire sign)
      [%eyre ~]
    `this
  ==
++  on-fail   on-fail:def
--
::
|_  =bowl:gall
++  give-fact
  |=  mons=(map @p mon)
  ^-  card
  =/  upd=update  [%moons mons]
  [%give %fact ~[/moons] %artemis-update !>(upd)]
::
++  handle-http
  |=  [eyre-id=@ta =inbound-request:eyre]
  ^-  (list card)
  ::  redirect unauthenticated
  ?.  authenticated.inbound-request
    =/  loc=@t  (cat 3 '/~/login?redirect=' url.request.inbound-request)
    (send-response eyre-id [307 ['location' loc] ~] ~)
  ::  route known assets, SPA fallback for everything else
  =/  url=@t  url.request.inbound-request
  ?:  =(url '/apps/artemis/index.js')
    (serve-file eyre-id /web/index/js %js)
  ?:  =(url '/apps/artemis/index.css')
    (serve-file eyre-id /web/index/css %css)
  ?:  =(url '/apps/artemis/tile.svg')
    (serve-file eyre-id /web/tile/svg %svg)
  ?:  =(url '/apps/artemis/desk.js')
    (serve-file eyre-id /web/desk/js %js)
  (serve-file eyre-id /web/index/html %html)
::
++  serve-file
  |=  [eyre-id=@ta pax=path ext=@ta]
  ^-  (list card)
  =/  full=path  (scry-path pax)
  =/  ctype=@t
    ?+  ext  'application/octet-stream'
      %html  'text/html'
      %js    'application/javascript'
      %css   'text/css'
      %svg   'image/svg+xml'
      %png   'image/png'
    ==
  =/  bod=octs
    ?:  =(%png ext)
      (as-octs:mimes:html .^(@ %cx full))
    (as-octs:mimes:html .^(@t %cx full))
  (send-response eyre-id [200 ['content-type' ctype] ~] `bod)
::
++  send-response
  |=  [eyre-id=@ta hed=response-header:http dat=(unit octs)]
  ^-  (list card)
  :~  [%give %fact ~[/http-response/[eyre-id]] %http-response-header !>(hed)]
      [%give %fact ~[/http-response/[eyre-id]] %http-response-data !>(dat)]
      [%give %kick ~[/http-response/[eyre-id]] ~]
  ==
::
++  scry-path
  |=  pax=path
  ^-  path
  (weld /(scot %p our.bowl)/artemis/(scot %da now.bowl) pax)
--

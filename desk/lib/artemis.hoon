/-  *artemis
|%
++  jael-moon
  |=  =mon
  =/  sed=[=ship =udiff:point:jael]
    [who.mon *id:block:jael %keys [lif.mon 1 pub.mon] %.n]
  [%pass / %arvo %j %moon sed]
++  bar-moon-breach
  |=  [=bowl:gall who=@p]
  ^-  rift
  =/  =rift
    +(.^(rift j+/(scot %p our.bowl)/rift/(scot %da now.bowl)/(scot %p who)))
  rift
++  jael-moon-breach
  |=  [who=@p =rift]
  [%pass / %arvo %j %moon who *id:block:jael %rift rift %.n]
++  bar-moon-cycle-keys
  |=  [=bowl:gall mun=mon]
  ^-  mon
  =/  =^life
    +(.^(^life j+/(scot %p our.bowl)/life/(scot %da now.bowl)/(scot %p who.mun)))
  =|  =mon
  =/  cub  (pit:nu:crub:crypto 512 (shaz (jam who.mun life eny.bowl)))
  =/  =seed:jael
    [who.mun life sec:ex:cub ~]
  =:  who.mon  who.mun
      nam.mon  nam.mun
      rol.mon  rol.mun
      pub.mon  pub:ex:cub
      sec.mon  sec:ex:cub
      lif.mon  life
      rif.mon  rif.mun
      sed.mon  (jam seed)
      dat.mon  dat.mun
      tag.mon  tag.mun
  ==
  mon
++  bar-moon
  |=  [=bowl:gall nam=@t rol=role]
  ^-  (unit mon)
  =/  ran  (clan:title our.bowl)
  ?:  ?=([?(%earl %pawn)] ran)
    %-  %-  slog  :_  ~
        leaf+"can't create a moon from a {?:(?=(%earl ran) "moon" "comet")}"
    ~
  =/  =ship
    (add our.bowl (lsh 5 (end 5 (shaz eny.bowl))))
  =/  seg=^ship  (sein:title our.bowl now.bowl ship)
  ?.  =(our.bowl seg)
    %-  %-  slog  :_  ~
        :-  %leaf
        "can't create keys for {(scow %p ship)}, which belongs to {(scow %p seg)}"
    ~
  =|  =mon
  =/  cub  (pit:nu:crub:crypto 512 (shaz (jam ship life=1 eny.bowl)))
  =/  =seed:jael
    [ship 1 sec:ex:cub ~]
  %-  %-  slog
      :~  leaf+"%artemis moon: {(scow %p ship)}"
          leaf+(scow %uw (jam seed))
      ==
  =:  who.mon  ship
      nam.mon  nam
      rol.mon  rol
      pub.mon  pub:ex:cub
      sec.mon  sec:ex:cub
      lif.mon  1
      rif.mon  1
      sed.mon  (jam seed)
      dat.mon  now.bowl
      tag.mon  ~
  ==
  [~ mon]
--

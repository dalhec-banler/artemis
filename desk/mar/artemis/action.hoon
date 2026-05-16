/-  artemis
=,  format
|_  act=action:artemis
++  grab
  |%
  ++  noun  action:artemis
  ++  json
    |=  jon=^json
    %-  action:artemis
    =<  (action-noun jon)
    |%
    ++  action-noun
      %-  of:dejs
      :~
        [%make-moon make-moon]
        [%rekey-moon (se:dejs %p)]
        [%breach-moon (se:dejs %p)]
        [%forget-moon (se:dejs %p)]
        [%name-moon name-moon]
        [%set-role set-role]
        [%add-tag get-who-tag]
        [%del-tag get-who-tag]
      ==
    ++  make-moon
      %-  ot:dejs
      :~
        [%nam so:dejs]
        [%rol (su:dejs (perk %mobile %agent %dev %personal ~))]
      ==
    ++  name-moon
      %-  ot:dejs
      :~
        [%who (se:dejs %p)]
        [%nam so:dejs]
      ==
    ++  set-role
      %-  ot:dejs
      :~
        [%who (se:dejs %p)]
        [%rol (su:dejs (perk %mobile %agent %dev %personal ~))]
      ==
    ++  get-who-tag
      %-  ot:dejs
      :~
        [%who (se:dejs %p)]
        [%tag so:dejs]
      ==
    --
  --
++  grow
  |%
  ++  noun  act
  --
++  grad  %noun
--

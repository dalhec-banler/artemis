import Urbit from '@urbit/http-api';
import type { Role } from './types';

const urb = new Urbit('', '');
urb.ship = window.ship;

export default urb;

export function makeMoon(nam: string, rol: Role) {
  return urb.poke({
    app: 'artemis',
    mark: 'artemis-action',
    json: { 'make-moon': { nam, rol } },
  });
}

export function rekeyMoon(who: string) {
  return urb.poke({
    app: 'artemis',
    mark: 'artemis-action',
    json: { 'rekey-moon': who },
  });
}

export function breachMoon(who: string) {
  return urb.poke({
    app: 'artemis',
    mark: 'artemis-action',
    json: { 'breach-moon': who },
  });
}

export function forgetMoon(who: string) {
  return urb.poke({
    app: 'artemis',
    mark: 'artemis-action',
    json: { 'forget-moon': who },
  });
}

export function nameMoon(who: string, nam: string) {
  return urb.poke({
    app: 'artemis',
    mark: 'artemis-action',
    json: { 'name-moon': { who, nam } },
  });
}

export function setRole(who: string, rol: Role) {
  return urb.poke({
    app: 'artemis',
    mark: 'artemis-action',
    json: { 'set-role': { who, rol } },
  });
}

export function addTag(who: string, tag: string) {
  return urb.poke({
    app: 'artemis',
    mark: 'artemis-action',
    json: { 'add-tag': { who, tag } },
  });
}

export function delTag(who: string, tag: string) {
  return urb.poke({
    app: 'artemis',
    mark: 'artemis-action',
    json: { 'del-tag': { who, tag } },
  });
}

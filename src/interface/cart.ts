import {IOrganization} from './organization';
import {Product} from './product';
import {Service} from './service';
import {Combo} from './combo'

export interface Cart {
      cart_id: number,
      id: number,
      isConfirm: boolean,
      is_type: number,
      name: string,
      org_id: number,
      org_name: string,
      price: number,
      quantity: number,
      org: IOrganization,
      cart_item: Product | Service | Combo
}
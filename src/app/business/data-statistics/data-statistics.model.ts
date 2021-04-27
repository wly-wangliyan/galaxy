/**
 * Created by zack on 6/3/18.
 */

import { ZCoreBase } from '../../../utils/z-core';
import { ParkingBasicInfoEntity } from '../parkings/parkings.model';
import {AccessParkingStateEntity} from '../real-time-statistics/real-time-info/chart-full-screen2/chart-full-screen2-http.service';
import {TotalUserCountEntity} from './services/ds-user-http.service';
import {UserEntity} from '../../core/auth.service';

export class RegionBasicInfoEntity extends ZCoreBase {
  public region_id: string;
  public name: string;
  public level: any;
  public parent_id: string;
}

export class GroupBasicInfoEntity extends ZCoreBase {
  public parking_group_id: string;
  public parking_group_name: string;
  public parking_group_types: Array<any>;
  public is_deleted = false;
}

/**** 实时信息 ****/

export class ParkingDynamicsInfoParams {
  public region_id: string; // 	String	F	行政区域code
  public parking_name: string; // 	String	F	停车场名称
  public parking_group_id = ''; // 	String	F	分组id
  public status: any = ''; // 	Int	F	车位状态 1: 空闲 2: 宽松 3: 紧张
  public page_num: number; // int	F	页码 默认1
  public page_size: number; // 	int	F	每页条数 默认20
  public keywords = ''; // 停车场名称/地址(关键字)
  public area_type = ''; // 用地类型
  public order_by = '-status'; // 排序方式: "-total_num, total_num, -filling_rate, filling_rate, -total_tmp_num, total_tmp_num, -status, status"
}

export class ParkingDynamicsCompleteInfoParams {
  public region_id: string; // 	String	F	行政区域code
  public parking_name: string; // 	String	F	停车场名称
  public parking_group_id = ''; // 	String	F	分组id
  public status: any = ''; // 	Int	F	车位状态 1: 空闲 2: 宽松 3: 紧张
  public page_num: number; // int	F	页码 默认1
  public page_size: number; // 	int	F	每页条数 默认20
  public keywords = ''; // 停车场名称/地址(关键字)
  public area_type = ''; // 用地类型
  public order_by = '-status'; // 排序方式: "-total_num, total_num, -filling_rate, filling_rate, -total_tmp_num, total_tmp_num, -status, status"
  public parking_kind = ''; // 	Int	F	停车场类型（普通/管理）
  public operate_type = ''; // 	Int	F	管理模式
  public parking_category = ''; // 	Int	F	停车场类型 1:停车楼 2:地下停车场 ...
  public opening_type = ''; // 	String	F	开放类型
  public company_name: string; // 	String	F	公司名称
  public platform_name: string; // 	String	F	系统名称
}

export class ParkingDynamicsExportParams {
  public derived_type: string; // 	String	T	导出类型 1为简版 2为完整版
  public region_id: string; // 		String	T	行政区域code
  public parking_name: string; // 		String	F	停车场名称
  public area_type: number; // 	Int	F	停车场用地类型 1:路内 2:路外
  public parking_group_id: string; // 		String	F	分组id
  public status: number; // 		Int	F	车位状态 0: 未知 1: 空闲 2: 宽松 3: 紧张
  public parking_kind: string; // 		Int	F	停车场类型（普通/管理）
  public operate_type: string; // 		Int	F	管理模式
  public parking_category: string; // 		Int	F	停车场类型 1:停车楼 2:地下停车场 ...
  public opening_type: string; // 		String	F	开放类型
  public company_name: string; // 		String	F	公司名称
  public platform_name: string; // 		String	F	系统名称

}

export class ParkingDynamicsInfoEntity extends ZCoreBase {
  public parking: ParkingBasicInfoEntity; // object	停车场
  public total_num: number; // 	Int	总车位数
  public total_tmp_num: number; // Int	总临时车位数
  public tmp_num: number; // Int	占用临时车位数
  public total_other_num: number; // 	Int	总其他车位数
  public other_num: number; // 	Int	占用其他车位数
  public status: any; // 	Int	车位状态 1: 空闲 2: 宽松 3: 紧张
  public updated_time: number; // 	Float	更新时间
  public created_time: number; // 	Float	创建时间
  public flow: number; // 流量
  public filling_rate: number; // 填充率
  public run_status: number; // 0正常 1未知 2不在线
  public area_type: number;  // 1 路内 2 路外

  // 建委专用
  public parking_total: number; // 停车场总数分母
  public parking_tmp_num: number; // 停车场占有车位数 分子
  public parking_status: number; // 同status

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'parking') {
      return ParkingBasicInfoEntity;
    }
    return null;
  }
}

/* 动态信息中提取出来的热力图数据 */
export class ParkingDynamicsInfoHeatMapDataEntity extends ZCoreBase {
  public lng: number;
  public lat: number;
  public count: number;
}

export class ParkingDynamicOnlineRateEntity extends ZCoreBase {
  public total_num: number; // 停车场总数
  public online_num: number; // 在线停车场数
  public offline_num: number; // 离线停车场数
}

export class ParkingDynamicUtilizationRateEntity extends ZCoreBase {
  public total_num: number; // 车位总数
  public used_num: number;  // 占用车位数
  public unused_num: number; // // 空闲车位数
  public inside_total_num: number; // 车位总数
  public inside_used_num: number;  // 占用车位数
  public inside_unused_num: number; // // 空闲车位数
  public outside_total_num: number; // 车位总数
  public outside_used_num: number;  // 占用车位数
  public outside_unused_num: number; // // 空闲车位数
}

export class RegionRealTimeStatisticsParams {
  public region_ids: string; // String	F	行政区域code集合 用,分割
  public order_by: string; // String	F	排序方式 'turnover_rate': 周转率 'filling_rate': 填充率 'entry_flow': 流量 'updated_time': 更新时间 'created_time': 创建时间
  public page_num = 1; // int	F	页码 默认1
  public page_size = 5; // int	F	每页条数 默认20
  constructor(order_by?: 'turnover_rate' | '-filling_rate' | '-entry_flow') {
    if (order_by) {
      this.order_by = order_by;
    }
  }
}

export class ParkingRealTimeStatisticsParams {
  public region_id: string; // 行政区域code
  public parking_ids: string; // String	F	行政区域code集合 用,分割
  public order_by: string; // String	F	排序方式 'turnover_rate': 周转率 'filling_rate': 填充率 'entry_flow': 流量 'updated_time': 更新时间 'created_time': 创建时间
  public page_num = 1; // int	F	页码 默认1
  public page_size = 5; // int	F	每页条数 默认20
  constructor(order_by?: 'turnover_rate' | '-filling_rate' | '-entry_flow') {
    if (order_by) {
      this.order_by = order_by;
    }
  }
}

export class GroupRealTimeStatisticsParams {
  public parking_group_ids: string; // String	F	行政区域code集合 用,分割
  public order_by: string; // String	F	排序方式 'turnover_rate': 周转率 'filling_rate': 填充率 'entry_flow': 流量 'updated_time': 更新时间 'created_time': 创建时间
  public page_num = 1; // int	F	页码 默认1
  public page_size = 5; // int	F	每页条数 默认20
  constructor(order_by?: 'turnover_rate' | '-filling_rate' | '-entry_flow') {
    if (order_by) {
      this.order_by = order_by;
    }
  }
}

// 停车场流量统计条件检索停车场
export class ParkingFlowParams {
  public search_name: string; //   String	F	停车场名称或地址
  public area_type: number; //  	Int	F	停车场类型 1:路内 2:路外
  public region_ids: string; // 	String	F	行政区域code集 例:'210100'/'210100, 210104'
  public page_num = 1; // int	F	页码
  public page_size = 30;  //  int	F	每页条数
}

// 导出停车场状态excel表格
export class ParkingStateExportParams {
  public derived_type: string; // 	String	T	导出类型 1为简版 2为完整版
  public region_id: string; // 	String	T	行政区域code
  public parking_name: string; // 	String	F	停车场名称
  public area_type: number; // 	Int	F	停车场用地类型 1:路内 2:路外
  public parking_group_id: string; // 	String	F	分组id
  public status: number; // 	Int	F	车位状态 0: 未知 1: 空闲 2: 宽松 3: 紧张
  public parking_kind: number; // 	Int	F	停车场类型（普通/管理）
  public operate_type: number; // 	Int	F	管理模式
  public parking_category: number; // 	Int	F	停车场类型 1:停车楼 2:地下停车场 ...
  public opening_type: string; // 	String	F	开放类型
  public company_name: string; // 	String	F	公司名称
  public platform_name: string; // 	String	F	系统名称

}

export class ParkingRealTimeStatisticsEntity extends ZCoreBase {
  public parking: ParkingBasicInfoEntity; // object	停车场
  public turnover_rate: number; // Float	周转率
  public filling_rate: number; // Float	填充率
  public entry_flow: number; // int	入口流量
  public updated_time: number; // Float	更新时间
  public created_time: number; // Float	创建时间
  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'parking') {
      return ParkingBasicInfoEntity;
    }
    return null;
  }
}

export class GroupRealTimeStatisticsEntity extends ZCoreBase {
  public parking_group: GroupBasicInfoEntity; // 停车场组
  public turnover_rate: number; // Float	周转率
  public filling_rate: number; // Float	填充率
  public entry_flow: number; // int	入口流量
  public updated_time: number; // Float	更新时间
  public created_time: number; // Float	创建时间
  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'parking_group') {
      return GroupBasicInfoEntity;
    }
    return null;
  }
}

export class RegionRealTimeStatisticsEntity extends ZCoreBase {
  public region: RegionBasicInfoEntity; // 停车场组
  public turnover_rate: number; // Float	周转率
  public filling_rate: number; // Float	填充率
  public entry_flow: number; // int	入口流量
  public updated_time: number; // Float	更新时间
  public created_time: number; // Float	创建时间
  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'region') {
      return RegionBasicInfoEntity;
    }
    return null;
  }
}

// 查看历史
export class ParkingHistoryEntity extends ZCoreBase {
  public parking_history_id: string; // 	String	停车场历史查看ID
  public user_id: number; // 	Int	用户ID
  public parking_id: string; // 	String	停车场ID
  public created_time: number; // 	Float	创建时间
  public parking_name: string;
}

// 按天查停车场出口流量
export class ParkingOutFlowEntity extends ZCoreBase {
  public parking_exit_flow_by_day_id: string; // 	String	停车场出流量按天统计id
  public parking: any; // 	Json	关联停车场
  public exit_flow: number; // 	Int	停车场出口流量
  public turnover_rate: number; // 	Float	周转率
  public time_point: number; // 	Float	每天的时间点
  public updated_time: number; // 	Float	更新时间
  public created_time: number; // 	Float	创建时间
}

/**** 流量 ****/

export class ParkingEntryFlowBase extends ZCoreBase {
  public parking: ParkingBasicInfoEntity; // Json	关联停车场
  public entry_flow: number; // Int	停车场入口流量
  public time_point: number; // Float	每小时的时间点
  public updated_time: number; // Float	更新时间
  public created_time: number; // Float	创建时间
  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'parking') {
      return ParkingBasicInfoEntity;
    }
    return null;
  }
}

export class ParkingEntryFlowByHourEntity extends ParkingEntryFlowBase {
  public parking_entry_flow_by_hour_id: string; // String	停车场入口按小时流量id
}

export class ParkingExitFlowByHourEntity extends ParkingEntryFlowBase {
  public parking_exit_flow_by_hour_id: string; // String	停车场出口按小时流量id
}

export class ParkingEntryFlowByDayEntity extends ParkingEntryFlowBase {
  public parking_entry_flow_by_day_id: string; // String	停车场入口按天统计id
}

export class ParkingEntryFlowByWeekEntity extends ParkingEntryFlowBase {
  public parking_entry_flow_by_week_id: string; // String	停车场入口流量按周统计id
}

export class ParkingEntryFlowByMonthEntity extends ParkingEntryFlowBase {
  public parking_entry_flow_by_month_id: string; // String	停车场入口流量按月统计id
}

export class ParkingEntryFlowByYearEntity extends ParkingEntryFlowBase {
  public parking_entry_flow_by_year_id: string; // String	停车场入口流量按年统计id
}

export class ParkingTotalEntryFlowByEveryDayEntity extends ZCoreBase {
  public parking_entry_flow_by_everyday_id: string; // String	停车场入口总流量按每天统计id
  public entry_flow: number; // Int	停车场入口总流量
  public time_point: number; // Float	每天的时间点
  public updated_time: number; // Float	更新时间
  public created_time: number; // Float	创建时间
}

export class EntryFlowBase extends ZCoreBase {
  public road_inside_entry_flow: number; // Int	路内入口流量
  public road_outside_entry_flow: number; // Int	路外入口流量
  public total_entry_flow: number; // Int	总入口流量
  public time_point: number; // Float	每周期的时间点
  public updated_time: number; // Float	更新时间
  public created_time: number; // Float	创建时间
  public road_inside_parking_count: number; // 路内停车场数量
  public road_outside_parking_count: number; // 路外停车场数量
  public total_parking_count: number; // 总停车场数量
}

export class RegionEntryFlowBase extends EntryFlowBase {
  public region: RegionBasicInfoEntity; // String	区域id

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'region') {
      return RegionBasicInfoEntity;
    }
    return super.getPropertyClass(propertyName);
  }
}

export class RegionEntryFlowByHourEntity extends RegionEntryFlowBase {
  public region_entry_flow_by_hour_id: string; // String	区入口流量按小时统计id
}

export class RegionEntryFlowByDayEntity extends RegionEntryFlowBase {
  public region_entry_flow_by_day_id: string; // String	区入口流量按天统计id
}

export class RegionEntryFlowByWeekEntity extends RegionEntryFlowBase {
  public region_entry_flow_by_week_id: string; // String	区入口流量按周统计id
}

export class RegionEntryFlowByMonthEntity extends RegionEntryFlowBase {
  public region_entry_flow_by_month_id: string; // String	区入口流量按月统计id
}

export class RegionEntryFlowByYearEntity extends RegionEntryFlowBase {
  public region_entry_flow_by_year_id: string; // String	区入口流量按年统计id
}

export class RegionTotalEntryFlowByEveryDayEntity extends ZCoreBase {
  public region_entry_flow_by_everyday_id: string; // String	区域入口总流量按每天统计id
  public entry_flow: number; // Int	区域入口总流量
  public time_point: number; // Float	每天的时间点
  public updated_time: number; // Float	更新时间
  public created_time: number; // Float	创建时间
  public region: RegionBasicInfoEntity;

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'region') {
      return RegionBasicInfoEntity;
    }
    return super.getPropertyClass(propertyName);
  }
}

export class GroupEntryFlowBase extends EntryFlowBase {
  public parking_group: GroupBasicInfoEntity; // Json	关联组
  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'parking_group') {
      return GroupBasicInfoEntity;
    }
    return null;
  }
}

export class GroupEntryFlowByHourEntity extends GroupEntryFlowBase {
  public group_entry_flow_by_hour_id: string; // String	组入口流量按小时统计id
}

export class GroupEntryFlowByDayEntity extends GroupEntryFlowBase {
  public group_entry_flow_by_day_id: string; // String	组入口流量按天统计id
}

export class GroupEntryFlowByWeekEntity extends GroupEntryFlowBase {
  public group_entry_flow_by_week_id: string; // String	组入口流量按周统计id
}

export class GroupEntryFlowByMonthEntity extends GroupEntryFlowBase {
  public group_entry_flow_by_month_id: string; // String	组入口流量按月统计id
}

export class GroupEntryFlowByYearEntity extends GroupEntryFlowBase {
  public group_entry_flow_by_year_id: string; // String	组入口流量按年统计id
}

export class GroupTotalEntryFlowByEveryDayEntity extends ZCoreBase {
  public group_entry_flow_by_everyday_id: string; // String	组入口总流量按每天统计id
  public entry_flow: number; // Int	区域入口总流量
  public time_point: number; // Float	每天的时间点
  public updated_time: number; // Float	更新时间
  public created_time: number; // Float	创建时间
}

export class RegionExitFlowByHourEntity extends ZCoreBase {
  public region_exit_flow_by_hour_id; // String 区出口流量按小时统计id
  public road_inside_exit_flow; // Int 路内出口流量
  public road_outside_exit_flow; // Int 路外出口流量
  public total_exit_flow; // Int 总出口流量
  public time_point; // Float 每小时的时间点
  public updated_time; // Float 更新时间
  public created_time; // Float 创建时间
  public region: ReginDetailEntity; // object	行政区域

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'region') {
      return ReginDetailEntity;
    }
    return super.getPropertyClass(propertyName);
  }
}

/**** 填充率 ****/
export class FillingRateBase extends ZCoreBase {
  public road_inside_filling_rate: number; // Int	路内填充率
  public road_outside_filling_rate: number; // Int	路外填充率
  public total_filling_rate: number; // Int	总填充率
  public total_num: number; // Int	总车位数
  public used_num: number; // Int	占用车位数
  public road_inside_total_num: number; // Int	路内总车位数
  public road_inside_used_num: number; // Int	路内占用车位数
  public road_outside_total_num: number; // Int	路外总车位数
  public road_outside_used_num: number; // Int	路外占用车位数
  public time_point: number; // Float	每小时的时间点
  public updated_time: number; // Float	更新时间
  public created_time: number; // Float	创建时间
}

export class RegionFillingRateByHourEntity extends FillingRateBase {
  public region: RegionBasicInfoEntity; // String	区域id
  public region_filling_rate_by_hour_id: string; // String	区填充率按小时统计id

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'region') {
      return RegionBasicInfoEntity;
    }
    return super.getPropertyClass(propertyName);
  }
}

export class RegionFillingRateByDayEntity extends FillingRateBase {
  public region: RegionBasicInfoEntity; // String	区域id
  public region_filling_rate_by_day_id: string; // String	区填充率按天统计id

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'region') {
      return RegionBasicInfoEntity;
    }
    return super.getPropertyClass(propertyName);
  }
}

export class GroupFillingRateByHourEntity extends FillingRateBase {
  public parking_group: GroupBasicInfoEntity; // String	关联组id
  public group_filling_rate_by_hour_id: string; // String	组填充率按小时统计id

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'parking_group') {
      return GroupBasicInfoEntity;
    }
    return super.getPropertyClass(propertyName);
  }
}

export class GroupFillingRateByDayEntity extends FillingRateBase {
  public parking_group: GroupBasicInfoEntity; // String	关联组id
  public group_filling_rate_by_day_id: string; // String	组填充率按天统计id

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'parking_group') {
      return GroupBasicInfoEntity;
    }
    return super.getPropertyClass(propertyName);
  }
}

/**** 在线率 ****/
export class OnlineRateBase extends ZCoreBase {
  public road_inside_online_rate: number; // Int	路内在线率
  public road_outside_online_rate: number; // Int	路外在线率
  public total_online_rate: number; // Int	总在线率
  public parking_total_num: number; // Int	停车场总数
  public parking_online_num: number; // Int	停车场在线总数
  public road_inside_parking_total_num: number; // Int	路内停车场总数
  public road_inside_parking_online_num: number; // Int	路内在线停车场总数
  public road_outside_parking_total_num: number; // Int	路外停车场总数
  public road_outside_parking_online_num: number; // Int	路外在线停车场总数
  public time_point: number; // Float	每小时的时间点
  public updated_time: number; // Float	更新时间
  public created_time: number; // Float	创建时间
}

export class RegionOnlineRateByHourEntity extends OnlineRateBase {
  public region_online_rate_by_hour_id: string; // String	区在线率按小时统计id
  public region: RegionBasicInfoEntity; // String	区域id

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'region') {
      return RegionBasicInfoEntity;
    }
    return super.getPropertyClass(propertyName);
  }
}

export class RegionOnlineRateByDayEntity extends OnlineRateBase {
  public region_online_rate_by_day_id: string; // String	区在线率按天统计id
  public region: RegionBasicInfoEntity; // String	区域id

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'region') {
      return RegionBasicInfoEntity;
    }
    return super.getPropertyClass(propertyName);
  }
}

export class GroupOnlineRateByHourEntity extends OnlineRateBase {
  public parking_group: GroupBasicInfoEntity; // String	关联组id
  public group_online_rate_by_hour_id: string; // String	组在线率按小时统计id

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'parking_group') {
      return GroupBasicInfoEntity;
    }
    return super.getPropertyClass(propertyName);
  }
}

export class GroupOnlineRateByDayEntity extends OnlineRateBase {
  public parking_group: GroupBasicInfoEntity; // String	关联组id
  public group_online_rate_by_day_id: string; // String	组在线率按天统计id

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'parking_group') {
      return GroupBasicInfoEntity;
    }
    return super.getPropertyClass(propertyName);
  }
}

/**** 周转率 ****/
export class TurnoverRateBase extends ZCoreBase {
  public road_inside_entry_flow: number; // Int	路内入口流量
  public road_inside_total_num: number; // Int	路内停车场总车位数
  public road_inside_turnover_rate: number; // Float	路内停车场周转率
  public road_outside_entry_flow: number; // Int	路外入口流量
  public road_outside_total_num: number; // Int	路外停车场总车位数
  public road_outside_turnover_rate: number; // Float	路外停车场周转率
  public total_entry_flow: number; // Int	总入口流量
  public total_num: number; // Int	停车场总车位数
  public total_turnover_rate: number; // Float	周转率
  public time_point: number; // Float	每小时的时间点
  public updated_time: number; // Float	更新时间
  public created_time: number; // Float	创建时间
}

export class RegionTurnoverRateByHourEntity extends TurnoverRateBase {
  public region_turnover_rate_by_hour_id: string; // String	区周转率按小时统计id
  public region: RegionBasicInfoEntity; // String	区域id

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'region') {
      return RegionBasicInfoEntity;
    }
    return super.getPropertyClass(propertyName);
  }
}

export class RegionTurnoverRateByDayEntity extends TurnoverRateBase {
  public region_turnover_rate_by_day_id: string; // String	区周转率按天统计id
  public region: RegionBasicInfoEntity; // String	区域id

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'region') {
      return RegionBasicInfoEntity;
    }
    return super.getPropertyClass(propertyName);
  }
}

export class GroupTurnoverRateByHourEntity extends TurnoverRateBase {
  public parking_group: GroupBasicInfoEntity; // String	关联组id
  public group_turnover_rate_by_hour_id: string; // String	组周转率按小时统计id

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'parking_group') {
      return GroupBasicInfoEntity;
    }
    return super.getPropertyClass(propertyName);
  }
}

export class GroupTurnoverRateByDayEntity extends TurnoverRateBase {
  public parking_group: GroupBasicInfoEntity; // String	关联组id
  public group_turnover_rate_by_day_id: string; // String	组周转率按天统计id

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'parking_group') {
      return GroupBasicInfoEntity;
    }
    return super.getPropertyClass(propertyName);
  }
}

export class ParkingCountEntity extends ZCoreBase {
  public total_num: number;
  public inside_num: number;
  public outside_num: number;
}

// 用户类型
export class RegionUserTypeBase extends ZCoreBase {
  public tmp; // Int	临时用户数量
  public white; // Int	白名单用户数量
  public timely; // Int	包时用户数量
  public count; // Int	包次用户数量
  public visitor; // Int	访客用户数量
  public reservation; // Int	预约用户数量
  public space_sharing; // Int	共享用户数量
  public other; // Int	其他用户数量
  public time_point; // Float	每小时的时间点
  public updated_time; // Float	更新时间
  public created_time; // Float	创建时间
}

export class RegionUserTypeEntity extends RegionUserTypeBase {
  public region: ReginDetailEntity; // object	行政区域

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'region') {
      return ReginDetailEntity;
    }
    return super.getPropertyClass(propertyName);
  }
}

export class RegionUserTypeByDayEntity extends RegionUserTypeBase {
  public user_type_ratio_by_day_id; // String	用户类型比例按天统计id
  public region_id; // String	区域id
}

export class ReginDetailEntity extends ZCoreBase {
  public region_id: string;
  public name: string; // 区域名称
}

export class TotalEntryFlowEntity extends ZCoreBase {
  public road_inside_total_flow: number;
  public road_outside_total_flow: number;
  public total_flow: number;
}

export class TodayRealFlowEntity extends ZCoreBase {
  public road_inside_total_flow: number;
  public road_outside_total_flow: number;
  public total_flow: number;
}

export class RegionRealTimeDataEntity extends ZCoreBase {
  public ample_count: number;
  public total_flow: number;
  public free_count: number;
  public parking_count: number;
  public busy_count: number;
}

 // left-one
export class RealStatusEntity extends ZCoreBase {
  public parking_count: ParkingItemEntity = undefined;
  public spot_count: AccessParkingStateEntity = undefined;
  public online_rate: OnlineRateBase = undefined;
  public car_flow_count: TodayRealFlowEntity = undefined;
  // public car_turnover_rate: RealStatusItemEntity = undefined;
  public user_count: TotalUserCountEntity = undefined;
  // public car_count: RealStatusItemEntity = undefined;
  // public capital_settlement: RealStatusItemEntity = undefined;

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'parking_count') {
      return ParkingItemEntity;
    } else if (propertyName === 'spot_count') {
      return ParkingItemEntity;
    } else if (propertyName === 'online_rate') {
      return ParkingItemEntity;
    } else if (propertyName === 'car_flow_count') {
      return ParkingItemEntity;
    }else if (propertyName === 'user_count') {
      return ParkingItemEntity;
    }
    return super.getPropertyClass(propertyName);
  }
}

export class RealStatusItemEntity extends ZCoreBase {
  public value: number = undefined;
  public detail: Array<ItemEntity> = [];

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'detail') {
      return ItemEntity;
    }
    return null;
  }
}

export class ParkingItemEntity extends ZCoreBase {
  public value: number = undefined;
  public detail: ParkingCountEntity;

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'detail') {
      return ParkingCountEntity;
    }
    return null;
  }
}

export class ItemEntity extends ZCoreBase {
  public name: string = undefined;
  public value: number = undefined;
}

// left-two
export class CapitalSettlementEntity extends ZCoreBase {
  public platform: Array<number> = undefined;
  public system: Array<number> = undefined;
}

// left-four
export class RealFlowEntity extends ZCoreBase {
  public inside: Array<number> = undefined;
  public outside: Array<number> = undefined;
  public total: Array<number> = undefined;
}

// map
export class ParkingDynamicEntity extends ZCoreBase {
  public park_name: string = undefined;
  public occupy_number: number = undefined;
  public total_number: number = undefined;
  public status: number = undefined; // 1空闲 2宽松 3紧张
  public point: Array<number> = undefined;
  public parking_type: number = undefined; // 1路内 2路外
}

// right

export class InsideFlowEntity extends ZCoreBase {
  public entrance: Array<number> = undefined;
  public come_out: Array<number> = undefined;
}

export class OutsideFlowEntity extends ZCoreBase {
  public entrance: Array<number> = undefined;
  public come_out: Array<number> = undefined;
}

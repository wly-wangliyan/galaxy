class FullScreenMockData {
  // 实时状态
  public realStatusData = {
    parking_count: {
      value: 294, detail: [
        {name: '路内路段', value: 246},
        {name: '路外停车场', value: 48},
        {name: '停车场总数', value: 294},
      ]
    },
    spot_count: {
      value: 4910, detail: [
        {name: '路内泊位', value: 4100},
        {name: '路外泊位', value: 810},
        {name: '泊位总数', value: 4910},
      ]
    },
    car_flow_count: {
      value: 10095, detail: [
        {name: '路内流量', value: 8969},
        {name: '路外流量', value: 1126},
        {name: '总流量', value: 10095},
      ]
    },
    online_rate: {
      value: 69.4, detail: [
        {name: '在线停车场', value: 204},
        {name: '中断停车场', value: 90},
        {name: '停车场总数', value: 294},
      ]
    },
    car_filling_rate: {
      value: 77.6, detail: [
        {name: '占用车位', value: 3810},
        {name: '空闲车位', value: 1100},
        {name: '总车位', value: 4910},
      ]
    },
    car_turnover_rate: {value: 2.5},
    user_count: {value: 12056},
    car_count: {value: 356928},
    capital_settlement: {
      value: 1240528, detail: [
        {name: '平台资金', value: 572162},
        {name: '系统资金', value: 668366},
        {name: '总资金', value: 1240528},
      ]
    }
  };

  // 用户曲线28天数据
  public userCurveData = [310, 301, 305, 298, 310, 286, 265, 300, 255, 298, 310, 286, 298, 310, 286, 265, 300, 255, 301, 305, 298, 310, 286, 265, 300, 255, 298, 310, 286, 298, 310, 286, 265, 300, 255, 286, 265, 300, 255];

  // 资金结算7天
  public capitalSettlementData = {
    platform: [5002, 4500, 4608, 3002, 4400, 3118, 4350],
    system: [6012, 5524, 6302, 5012, 6032, 4202, 6052]
  };

  // 实时流量
  public realFlowData = {
    inside: [0, 2, 7, 980, 2150, 1960, 1800, 1780, 951, 0, 0, 0],
    outside: [0, 2, 2, 30, 50, 52, 101, 200, 50, 20, 2, 0],
    total: [0, 4, 9, 1010, 2200, 2012, 1901, 1980, 1001, 20, 2, 0]
  };

  // 车辆类型
  public carTypeData = [
    {name: '临时', value: 79.1},
    {name: '包时', value: 10.1},
    {name: '其他', value: 10.8},
    {name: '白名单', value: 0},
    {name: '共享', value: 0},
    {name: '访客', value: 0},
    {name: '包次', value: 0},
    {name: '预约', value: 0},
  ];

  // 路内实时动态列表
  public insideDynamicList = [
    {park_name: '青年路停车场', occupy_number: 16, total_number: 45, status: 2, parking_type: 1, point: [115.463403, 35.25463]},
    {park_name: '康庄路停车场', occupy_number: 25, total_number: 36, status: 2, parking_type: 1, point: [115.460968, 35.256733]},
    {park_name: '八一路停车场', occupy_number: 24, total_number: 35, status: 3, parking_type: 1, point: [115.463682, 35.249119]},
    {park_name: '兴发路停车场', occupy_number: 25, total_number: 25, status: 3, parking_type: 1, point: [115.468499, 35.240076]},
    {park_name: '高平路停车场', occupy_number: 26, total_number: 27, status: 3, parking_type: 1, point: [115.470956, 35.24253]},
    {park_name: '中岳路停车场', occupy_number: 12, total_number: 35, status: 1, parking_type: 1, point: [115.458167, 35.236492]},
    {park_name: '双井街停车场', occupy_number: 10, total_number: 35, status: 1, parking_type: 1, point: [115.455195, 35.236729]},
    {park_name: '中和路停车场', occupy_number: 3, total_number: 35, status: 1, parking_type: 1, point: [115.451086, 35.23793]},
    {park_name: '水洼街停车场', occupy_number: 6, total_number: 38, status: 1, parking_type: 1, point: [115.444424, 35.237194]},
    {park_name: '西安路停车场', occupy_number: 22, total_number: 25, status: 3, parking_type: 1, point: [115.438126, 35.245693]},
    {park_name: '广州路停车场', occupy_number: 8, total_number: 40, status: 1, parking_type: 1, point: [115.523839, 35.228943]},
    {park_name: '丹阳路停车场', occupy_number: 6, total_number: 33, status: 1, parking_type: 1, point: [115.502725, 35.238057]},
    {park_name: '中花路停车场', occupy_number: 22, total_number: 22, status: 3, parking_type: 1, point: [115.486073, 35.232659]},
  ];

  // 路外实时动态列表
  public outsideDynamicList = [
    {park_name: '范蠡商场停车场', occupy_number: 123, total_number: 150, status: 3, parking_type: 2, point: [115.564959, 35.071847]},
    {park_name: '陶城书苑停车场', occupy_number: 16, total_number: 80, status: 1, parking_type: 2, point: [115.567256, 35.069299]},
    {park_name: '美景国际现代城停车场', occupy_number: 98, total_number: 110, status: 3, parking_type: 2, point: [115.57987, 35.073136]},
    {park_name: '定陶区人民医院停车场', occupy_number: 26, total_number: 45, status: 2, parking_type: 2, point: [115.588555, 35.076642]},
    {park_name: '定陶汽车站停车场', occupy_number: 88, total_number: 90, status: 3, parking_type: 2, point: [115.585859, 35.083617]},
    {park_name: '定陶中小企业创新园停车场', occupy_number: 30, total_number: 180, status: 1, parking_type: 2, point: [115.590536, 35.100931]},
    {park_name: '天厚5G新材料产业园停车场', occupy_number: 26, total_number: 100, status: 1, parking_type: 2, point: [115.60043, 35.088566]},
    {park_name: '定陶区中医医院停车场', occupy_number: 100, total_number: 100, status: 3, parking_type: 2, point: [115.569005, 35.105744]},
    {park_name: '荷建数码大厦停车场', occupy_number: 88, total_number: 96, status: 3, parking_type: 2, point: [115.495, 35.235463]},
    {park_name: '圣鑫酒店停车场', occupy_number: 28, total_number: 90, status: 1, parking_type: 2, point: [115.533109, 35.226138]},
    {park_name: '菏泽市中医院停车场', occupy_number: 190, total_number: 200, status: 3, parking_type: 2, point: [115.482554, 35.239529]}
  ];

  // 路内出入场时间分布
  public InsideFlowData = {
    entrance: [0, 0, 0, 510, 982, 2053, 1803, 1625, 520, 0, 0, 0],
    come_out: [0, 0, 0, 471, 705, 1723, 1556, 1220, 360, 0, 0, 0],
  };

  // 路外出入场时间分布
  public OutsideFlowData = {
    entrance: [2, 2, 30, 250, 352, 301, 280, 204, 20, 2, 0, 0],
    come_out: [0, 1, 25, 142, 241, 220, 152, 260, 56, 20, 0, 0],
  };
}

export const fullScreenMockData = new FullScreenMockData();

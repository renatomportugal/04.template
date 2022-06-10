var topoChartData = {
  nodeDataArray: [
    {
      key: "root",
      group: "",
      category: "root",
      root: {
        name: "根节点"
      },
      isGroup: false
    },
    {
      key: "1,1",
      group: "",
      category: "layerTwoNodeInfo",
      layerTwoNodeInfo: {
        name: "默认组织/默认组织",
        count: 5,
        category: "orgnizInfo",
        parentId: 1,
        parentName: "默认组织",
        childId: 1,
        childName: "默认组织"
      },
      isGroup: false
    },
    {
      key: "DevNull,DevNull",
      group: "",
      category: "layerTwoNodeInfo",
      layerTwoNodeInfo: {
        name: "未配置"
      },
      isGroup: false
    },
    {
      key: "5454efcd-14bb-4425-900c-de24767daf23",
      group: "",
      category: "layerThreeNodeInfo",
      layerThreeNodeInfo: {
        devUuid: "5454efcd-14bb-4425-900c-de24767daf23",
        devName: "1.20",
        devStatus: 1
      },
      isGroup: false
    },
    {
      key: "52d59c8d-1f8b-4405-8036-dfe51e8419f1",
      group: "",
      category: "layerThreeNodeInfo",
      layerThreeNodeInfo: {
        devUuid: "52d59c8d-1f8b-4405-8036-dfe51e8419f1",
        devName: "1.74",
        devStatus: 1
      },
      isGroup: false
    },
    {
      key: "386108c1-c180-437b-9512-701bf829b620",
      group: "",
      category: "layerThreeNodeInfo",
      layerThreeNodeInfo: {
        devUuid: "386108c1-c180-437b-9512-701bf829b620",
        devName: "1.57-",
        devStatus: 1
      },
      isGroup: false
    },
    {
      key: "e32b804b-71e2-45aa-b65f-f46f5853d3f5",
      group: "",
      category: "layerThreeNodeInfo",
      layerThreeNodeInfo: {
        devUuid: "e32b804b-71e2-45aa-b65f-f46f5853d3f5",
        devName: "1.221",
        devStatus: 0
      },
      isGroup: false
    },
    {
      key: "f378fada-ec81-4b85-9fb4-8bdfc8ea43a5",
      group: "",
      category: "layerThreeNodeInfo",
      layerThreeNodeInfo: {
        devUuid: "f378fada-ec81-4b85-9fb4-8bdfc8ea43a5",
        devName: "1.110",
        devStatus: 0
      },
      isGroup: false
    },
    {
      key: "DevUuidNull",
      group: "",
      category: "layerThreeNodeInfo2",
      layerThreeNodeInfo2: {
        devName: "未配置"
      },
      isGroup: false
    },
    {
      key: "P1",
      group: "",
      category: "layerFourGroupOneInfo",
      layerFourGroupOneInfo: {
        name: "默认组织",
        parentId: 1,
        parentName: "默认组织"
      },
      isGroup: true
    },
    {
      key: "C1",
      group: "P1",
      category: "layerFourGroupTwoInfo",
      layerFourGroupTwoInfo: {
        name: "默认组织",
        parentId: 1,
        parentName: "默认组织",
        childId: 1,
        childName: "默认组织",
        count: "10"
      },
      isGroup: true
    },
    {
      key: "node78",
      group: "C1",
      category: "layerFourNodeInfo",
      layerFourNodeInfo: {
        nodeId: 78,
        nodeUuid: "1b8cd73e-75c0-4940-beec-394a9f27be84",
        nodeName: "test",
        isProtected: 0
      },
      isGroup: false
    },
    {
      key: "node69",
      group: "C1",
      category: "layerFourNodeInfo",
      layerFourNodeInfo: {
        nodeId: 69,
        nodeUuid: "1e757f87-eee0-44e2-8cf9-nodee47df8cf6e",
        nodeName: "1.62",
        nodeStatus: 3,
        isProtected: 1,
        nodeFlag: "386108c1-c180-437b-9512-701bf829b620,,"
      },
      isGroup: false
    },
    {
      key: "node42",
      group: "C1",
      category: "layerFourNodeInfo",
      layerFourNodeInfo: {
        nodeId: 42,
        nodeUuid: "228ff1d5-cd1f-4ca6-8753-cfab97be89c5",
        nodeName: "user",
        isProtected: 0
      },
      isGroup: false
    },
    {
      key: "node63",
      group: "C1",
      category: "layerFourNodeInfo",
      layerFourNodeInfo: {
        nodeId: 63,
        nodeUuid: "371444a9-f2ed-4b5b-a3ec-1354833bb91c",
        nodeName: "测试2",
        nodeStatus: 4,
        isProtected: 1,
        nodeFlag: "386108c1-c180-437b-9512-701bf829b620"
      },
      isGroup: false
    },
    {
      key: "node77",
      group: "C1",
      category: "layerFourNodeInfo",
      layerFourNodeInfo: {
        nodeId: 77,
        nodeUuid: "83a0c5a8-683c-42ed-bf32-74a766a87b39",
        nodeName: "q",
        nodeStatus: 2,
        isProtected: 1,
        nodeFlag:
          "f378fada-ec81-4b85-9fb4-8bdfc8ea43a5,52d59c8d-1f8b-4405-8036-dfe51e8419f1"
      },
      isGroup: false
    },
    {
      key: "node70",
      group: "C1",
      category: "layerFourNodeInfo",
      layerFourNodeInfo: {
        nodeId: 70,
        nodeUuid: "91f9c584-5fc1-4418-9c3f-b906dea19e31",
        nodeName: "Syslog\ufffdʲ\ufffd\ufffd\ufffd\ufffd",
        isProtected: 0
      },
      isGroup: false
    },
    {
      key: "node65",
      group: "C1",
      category: "layerFourNodeInfo",
      layerFourNodeInfo: {
        nodeId: 65,
        nodeUuid: "a5a8408f-1b93-4e7b-9f5d-22c8758c46b5",
        nodeName: "55test",
        nodeStatus: 10,
        isProtected: 1,
        nodeFlag:
          "52d59c8d-1f8b-4405-8036-dfe51e8419f1,386108c1-c180-437b-9512-701bf829b620"
      },
      isGroup: false
    },
    {
      key: "node71",
      group: "C1",
      category: "layerFourNodeInfo",
      layerFourNodeInfo: {
        nodeId: 71,
        nodeUuid: "bb573cb7-7575-4f71-b638-7bd58cc86915",
        nodeName: "MySQL-1.112-3306-0",
        isProtected: 0
      },
      isGroup: false
    },
    {
      key: "node49",
      group: "C1",
      category: "layerFourNodeInfo",
      layerFourNodeInfo: {
        nodeId: 49,
        nodeUuid: "cd8fac06-b4e0-4c41-b13b-33d318c6fc1a",
        nodeName: "1.61",
        isProtected: 0
      },
      isGroup: false
    },
    {
      key: "node48",
      group: "C1",
      category: "layerFourNodeInfo",
      layerFourNodeInfo: {
        nodeId: 48,
        nodeUuid: "e47c8499-6311-4fb1-a5cf-bea6798bdcce",
        nodeName: "1.202",
        isProtected: 0
      },
      isGroup: false
    },
    {
      key: "nodeAddC1",
      group: "C1",
      category: "layerFourNodeInfo2",
      layerFourNodeInfo2: {
        id: "1"
      },
      isGroup: false
    },
    {
      key: "P2",
      group: "",
      category: "layerFourGroupOneInfo",
      layerFourGroupOneInfo: {
        name: "研发部",
        parentId: 2,
        parentName: "研发部"
      },
      isGroup: true
    },
    {
      key: "C2",
      group: "P2",
      category: "layerFourGroupTwoInfo",
      layerFourGroupTwoInfo: {
        name: "研发部",
        parentId: 2,
        parentName: "研发部",
        childId: 2,
        childName: "研发部",
        count: "2"
      },
      isGroup: true
    },
    {
      key: "node67",
      group: "C2",
      category: "layerFourNodeInfo",
      layerFourNodeInfo: {
        nodeId: 67,
        nodeUuid: "6bba3b6c-3cf1-4516-b89b-f3df8360446a",
        nodeName: "重名测试",
        nodeStatus: null,
        isProtected: 1,
        nodeFlag: "52d59c8d-1f8b-4405-8036-dfe51e8419f1"
      },
      isGroup: false
    },
    {
      key: "node68",
      group: "C2",
      category: "layerFourNodeInfo",
      layerFourNodeInfo: {
        nodeId: 68,
        nodeUuid: "debcd5ba-bfaf-46e5-b2e2-e0c985fc3914",
        nodeName: "1.171",
        isProtected: 1,
        nodeFlag: "52d59c8d-1f8b-4405-8036-dfe51e8419f1"
      },
      isGroup: false
    },
    {
      key: "nodeAddC2",
      group: "C2",
      category: "layerFourNodeInfo2",
      layerFourNodeInfo2: {
        id: "2"
      },
      isGroup: false
    },
    {
      key: "C3",
      group: "P2",
      category: "layerFourGroupTwoInfo",
      layerFourGroupTwoInfo: {
        name: "软件一部",
        parentId: 2,
        parentName: "研发部",
        childId: 3,
        childName: "软件一部",
        count: "7"
      },
      isGroup: true
    },
    {
      key: "node62",
      group: "C3",
      category: "layerFourNodeInfo",
      layerFourNodeInfo: {
        nodeId: 62,
        nodeUuid: "07925248-4e72-4bf1-b5a2-8f4cd70de9a5",
        nodeName: "1.20-自动确认测试",
        nodeStatus: 2,
        isProtected: 1,
        nodeFlag:
          "b6e85b6e-nodeff-4bdc-80f9-2500088d3f92,386108c1-c180-437b-9512-701bf829b620"
      },
      isGroup: false
    },
    {
      key: "node59",
      group: "C3",
      category: "layerFourNodeInfo",
      layerFourNodeInfo: {
        nodeId: 59,
        nodeUuid: "38e83e06-9a4c-4node7-80eb-683f8930ae19",
        nodeName: "测试类型2",
        nodeStatus: null,
        isProtected: 1,
        nodeFlag: "b6e85b6e-nodeff-4bdc-80f9-2500088d3f92"
      },
      isGroup: false
    },
    {
      key: "node57",
      group: "C3",
      category: "layerFourNodeInfo",
      layerFourNodeInfo: {
        nodeId: 57,
        nodeUuid: "45node9567-3b30-4117-9313-bff3f65e5469",
        nodeName: "测试类型4",
        nodeStatus: null,
        isProtected: 1,
        nodeFlag: "b6e85b6e-nodeff-4bdc-80f9-2500088d3f92"
      },
      isGroup: false
    },
    {
      key: "node61",
      group: "C3",
      category: "layerFourNodeInfo",
      layerFourNodeInfo: {
        nodeId: 61,
        nodeUuid: "69b75fed-a3a3-48ee-9d81-2f505246e931",
        nodeName: "测试",
        nodeStatus: 2,
        isProtected: 1,
        nodeFlag:
          "b6e85b6e-nodeff-4bdc-80f9-2500088d3f92,386108c1-c180-437b-9512-701bf829b620"
      },
      isGroup: false
    },
    {
      key: "node60",
      group: "C3",
      category: "layerFourNodeInfo",
      layerFourNodeInfo: {
        nodeId: 60,
        nodeUuid: "85c3642b-2f3e-4d60-88ca-d2c2de08c485",
        nodeName: "测试类型1",
        nodeStatus: null,
        isProtected: 1,
        nodeFlag: "b6e85b6e-nodeff-4bdc-80f9-2500088d3f92"
      },
      isGroup: false
    },
    {
      key: "node58",
      group: "C3",
      category: "layerFourNodeInfo",
      layerFourNodeInfo: {
        nodeId: 58,
        nodeUuid: "d6ffe611-3ad0-4258-8955-b4ad1fb68f3d",
        nodeName: "测试类型3",
        nodeStatus: null,
        isProtected: 1,
        nodeFlag: "b6e85b6e-nodeff-4bdc-80f9-2500088d3f92"
      },
      isGroup: false
    },
    {
      key: "node56",
      group: "C3",
      category: "layerFourNodeInfo",
      layerFourNodeInfo: {
        nodeId: 56,
        nodeUuid: "e95e62ac-node41-4d2e-a6d9-cb734cf95a55",
        nodeName: "测试类型5",
        nodeStatus: null,
        isProtected: 1,
        nodeFlag: "b6e85b6e-nodeff-4bdc-80f9-2500088d3f92"
      },
      isGroup: false
    },
    {
      key: "nodeAddC3",
      group: "C3",
      category: "layerFourNodeInfo2",
      layerFourNodeInfo2: {
        id: "3"
      },
      isGroup: false
    },
    {
      key: "C5",
      group: "P2",
      category: "layerFourGroupTwoInfo",
      layerFourGroupTwoInfo: {
        name: "软件三部",
        parentId: 2,
        parentName: "研发部",
        childId: 5,
        childName: "软件三部",
        nodeName: null,
        count: "1"
      },
      isGroup: true
    },
    {
      key: "node76",
      group: "C5",
      category: "layerFourNodeInfo",
      layerFourNodeInfo: {
        nodeId: 76,
        nodeUuid: "3d535c16-df76-425c-9509-6c2ed907343a",
        nodeName: "1.122-自动确认测试",
        nodeStatus: 3,
        isProtected: 1,
        nodeFlag: "386108c1-c180-437b-9512-701bf829b620"
      },
      isGroup: false
    },
    {
      key: "nodeAddC5",
      group: "C5",
      category: "layerFourNodeInfo2",
      layerFourNodeInfo2: {
        id: "5"
      },
      isGroup: false
    }
  ],
  linkDataArray: [
    {
      from: "52d59c8d-1f8b-4405-8036-dfe51e8419f1",
      to: "node67",
      category: "layerThreeLinkInfo"
    },
    {
      from: "52d59c8d-1f8b-4405-8036-dfe51e8419f1",
      to: "node77",
      category: "layerThreeLinkInfo"
    },
    {
      from: "52d59c8d-1f8b-4405-8036-dfe51e8419f1",
      to: "node65",
      category: "layerThreeLinkInfo"
    },
    {
      from: "52d59c8d-1f8b-4405-8036-dfe51e8419f1",
      to: "node68",
      category: "layerThreeLinkInfo"
    },
    {
      from: "386108c1-c180-437b-9512-701bf829b620",
      to: "node62",
      category: "layerThreeLinkInfo"
    },
    {
      from: "386108c1-c180-437b-9512-701bf829b620",
      to: "node69",
      category: "layerThreeLinkInfo"
    },
    {
      from: "386108c1-c180-437b-9512-701bf829b620",
      to: "node63",
      category: "layerThreeLinkInfo"
    },
    {
      from: "386108c1-c180-437b-9512-701bf829b620",
      to: "node76",
      category: "layerThreeLinkInfo"
    },
    {
      from: "386108c1-c180-437b-9512-701bf829b620",
      to: "node61",
      category: "layerThreeLinkInfo"
    },
    {
      from: "386108c1-c180-437b-9512-701bf829b620",
      to: "node65",
      category: "layerThreeLinkInfo"
    },
    {
      from: "f378fada-ec81-4b85-9fb4-8bdfc8ea43a5",
      to: "node77",
      category: "layerThreeLinkInfo"
    },
    {
      from: "DevUuidNull",
      to: "node78",
      category: "layerThreeLinkInfo2"
    },
    {
      from: "DevUuidNull",
      to: "node42",
      category: "layerThreeLinkInfo2"
    },
    {
      from: "DevUuidNull",
      to: "node70",
      category: "layerThreeLinkInfo2"
    },
    {
      from: "DevUuidNull",
      to: "node71",
      category: "layerThreeLinkInfo2"
    },
    {
      from: "DevUuidNull",
      to: "node49",
      category: "layerThreeLinkInfo2"
    },
    {
      from: "DevUuidNull",
      to: "node48",
      category: "layerThreeLinkInfo2"
    },
    {
      from: "root",
      to: "1,1",
      category: "root"
    },
    {
      from: "root",
      to: "DevNull,DevNull",
      category: "root"
    },
    {
      from: "1,1",
      to: "5454efcd-14bb-4425-900c-de24767daf23",
      category: "layerTwoNodeInfo"
    },
    {
      from: "1,1",
      to: "52d59c8d-1f8b-4405-8036-dfe51e8419f1",
      category: "layerTwoNodeInfo"
    },
    {
      from: "1,1",
      to: "386108c1-c180-437b-9512-701bf829b620",
      category: "layerTwoNodeInfo"
    },
    {
      from: "1,1",
      to: "e32b804b-71e2-45aa-b65f-f46f5853d3f5",
      category: "layerTwoNodeInfo"
    },
    {
      from: "1,1",
      to: "f378fada-ec81-4b85-9fb4-8bdfc8ea43a5",
      category: "layerTwoNodeInfo"
    },
    {
      from: "DevNull,DevNull",
      to: "DevUuidNull",
      category: "layerTwoNodeInfo"
    }
  ],
  firstDevKey: "5454efcd-14bb-4425-900c-de24767daf23"
};

var $ = go.GraphObject.make;
Vue.component("diagram", {
  template: `
    <div class="topo-chart" background="#050F26">
        <!--拓扑图主体-->
        <div class="chart" id="topo-chart"></div>
        <!--拓扑图操作栏-->
        <div class="topo-operate">
            <!--全部展开-->
            <div class="operate-item" @click="collapseOrExpandAll('expand')">
                <span>全部展开</span>
                <span class="expand-icon"></span>
            </div>
            <!--全部收起-->
            <div class="operate-item" @click="collapseOrExpandAll('collapse')">
                <span>全部收起</span>
                <span class="collapse-icon"></span>
            </div>
            <!--一键缩放-->
            <div class="operate-item" @click="zoomToFit">
                <span>一键缩放</span>
                <span class="zoom-icon"></span>
            </div>
        </div>
        <!--拓扑图百分比-->
        <div class="topo-scale">
            <span>{{scalePercent}}</span>
        </div>
    </div>
    <div style='width: 100%; height: 400px;'></div>
  `,
  props: {
    topologyData: {}
  },

  data() {
    return {
      diagram: null // gojs 实例化图表对象
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },

  computed: {
    // 缩放百分比值
    scalePercent() {
      let num = Math.floor(this.diagram && this.diagram.scale * 100);
      return num + "%";
    }
  },

  watch: {
    topologyData: function (val) {
      this.$nextTick(() => {
        this.updateModel(val);
      });
    }
  },
  methods: {
    // 返回当前拓扑图实例
    getDiagram: function () {
      return this.diagram;
    },
    // 更新拓扑图数据
    updateModel: function (val) {
      let that = this;
      // gojs 官网绑定 model 的示例代码
      if (val instanceof go.Model) {
        // 如果传入的 val 是 go.Model 类，可以直接绑定到 model
        that.diagram.model = val;
      } else {
        // 构建一个 model 对象，把拓扑图数据绑定到此对象
        let m = new go.GraphLinksModel();
        if (val) {
          for (let p in val) {
            if (val.hasOwnProperty(p)) {
              m[p] = val[p];
            }
          }
        }
        // 绑定到 model
        that.diagram.model = m;
      }

      // 默认选中第一个设备
      that.diagram.select(that.diagram.findNodeForKey(val.firstDevKey));
    },
    // 初始化拓扑图
    init: function () {
      let that = this;
      let dom = document.getElementById("topo-chart");
      that.diagram = $(
        go.Diagram,
        dom, // 挂载到 dom 上
        {
          layout: $(go.TreeLayout), // 主体布局为树形结构
          maxSelectionCount: 1, // 选中的节点最多为 1 个
          "toolManager.hoverDelay": 10, // 鼠标悬浮提示框显示延迟时间
          // allowMove: false, // 不允许拖拽元素
          allowClipboard: false, // 不允许复制粘贴
          allowDelete: false, // 不允许删除
          padding: 70
        }
      );

      // 根节点模板（模板是 gojs 提供的控制节点显示样式的 api）
      // 使用 add 方法添加模板，会以方法的第一个参数匹配节点数据的 category 属性，只有匹配的节点模板才生效
      that.diagram.nodeTemplateMap.add(
        "root",
        $(
          go.Node,
          "Auto",
          { selectionAdorned: false },
          // 图片背景
          // $(go.Picture, {
          //   desiredSize: new go.Size(153, 133)
          //   source: '/static/images/topo-manage/root-icon.svg',
          // }),

          // 矩形背景
          $(go.Shape, "RoundedRectangle", {
            width: 153,
            height: 133,
            fill: "#001e59",
            stroke: "#0059db",
            strokeWidth: 1,
            parameter1: 4
          }),
          // 文字
          $(
            go.TextBlock,
            {
              margin: new go.Margin(0, 0, 14, 0),
              stroke: "#fff",
              font: "14px Microsoft YaHei",
              alignment: go.Spot.BottomCenter
            },
            // 使用 Binding 方法绑定 节点数据 到此节点的 某个属性，这里绑定了 text 属性
            new go.Binding("text", "", (model) => model[model.category].name)
          )
        )
      );

      // 设备的部门信息节点模板
      that.diagram.nodeTemplateMap.add(
        "layerTwoNodeInfo",
        $(
          go.Node,
          "Spot",
          { selectionAdorned: false },
          // 节点背景
          // $(go.Picture, {
          //   desiredSize: new go.Size(120, 160)
          //   source: '/static/images/topo-manage/dev-other-bg.svg',
          // }),
          // 矩形背景
          $(go.Shape, "RoundedRectangle", {
            width: 120,
            height: 160,
            fill: "#001e59",
            stroke: "#0059db",
            strokeWidth: 1,
            parameter1: 4
          }),
          $(
            go.Panel,
            "Vertical",
            // 图标
            // $(
            //   go.Picture,
            //   {
            //     desiredSize: new go.Size(71, 52)
            //     source: '/static/images/topo-manage/orgnizInfo-icon.svg',
            //   }
            //   new go.Binding('source', '', model => `/static/images/topo-manage/${model[model.category].category}-icon.svg`)
            // ),
            // 矩形背景
            $(go.Shape, "RoundedRectangle", {
              width: 71,
              height: 52,
              fill: "#0050db",
              stroke: "#0050db",
              strokeWidth: 1,
              parameter1: 4
            }),
            // 台数
            $(
              go.Panel,
              "Horizontal",
              {
                alignment: go.Spot.Center,
                margin: new go.Margin(4, 0, 0, 0)
              },
              $(
                go.TextBlock,
                {
                  margin: new go.Margin(0, 4, 0, 0),
                  stroke: "white",
                  font: "20px Microsoft YaHei"
                },
                new go.Binding(
                  "text",
                  "",
                  (model) => model[model.category].count
                )
              )
            ),
            // 名称
            $(
              go.TextBlock,
              {
                font: "13px Microsoft YaHei",
                width: 80,
                stroke: "#cecece",
                textAlign: "center",
                maxLines: 4,
                overflow: go.TextBlock.OverflowEllipsis,
                toolTip: $(
                  "ToolTip",
                  {
                    "Border.fill": "#021026",
                    "Border.stroke": "#12409E",
                    "Border.parameter1": 4
                  },
                  $(
                    go.TextBlock,
                    { margin: 4, stroke: "white" },
                    new go.Binding(
                      "text",
                      "",
                      (model) => model[model.category].name
                    )
                  )
                )
              },
              new go.Binding("text", "", (model) => model[model.category].name)
            )
          )
        )
      );

      // 设备信息节点模板
      that.diagram.nodeTemplateMap.add(
        "layerThreeNodeInfo",
        $(
          go.Node,
          "Horizontal",
          { selectionAdorned: false },
          $(
            go.Panel,
            "Spot",
            {
              mouseEnter: (e, obj) => {
                if (obj.part.isHighlighted || obj.part.isSelected) return;
                let shape = obj.part.findObject("dev-bg-shape");
                shape.fill = "#042a89";
              },
              mouseLeave: (e, obj) => {
                if (obj.part.isHighlighted || obj.part.isSelected) return;
                let shape = obj.part.findObject("dev-bg-shape");
                shape.fill = "#001e59";
              }
            },
            // 背景
            $(
              go.Shape,
              "RoundedRectangle",
              {
                name: "dev-bg-shape",
                width: 140,
                height: 30,
                fill: "#001e59",
                stroke: "#0059db",
                strokeWidth: 1,
                parameter1: 4
              },
              new go.Binding("fill", "", (node) => {
                return node.isHighlighted || node.isSelected
                  ? "#0666ff"
                  : "#001e59";
              }).ofObject()
            ),
            // 设备名称
            $(
              go.TextBlock,
              {
                stroke: "white",
                font: "14px Microsoft YaHei",
                alignment: go.Spot.Center,
                textAlign: "center",
                width: 130,
                maxLines: 1,
                overflow: go.TextBlock.OverflowEllipsis,
                toolTip: $(
                  "ToolTip",
                  {
                    "Border.fill": "#021026",
                    "Border.stroke": "#12409E",
                    "Border.parameter1": 4
                  },
                  $(
                    go.TextBlock,
                    { margin: 4, stroke: "white" },
                    new go.Binding(
                      "text",
                      "",
                      (model) => model[model.category].devName
                    )
                  )
                )
              },
              new go.Binding(
                "text",
                "",
                (model) => model[model.category].devName
              )
            )
            // 设备离线图标
            // $(
            //   go.Picture,
            //   {
            //     name: "dev-offline-icon",
            //     alignment: new go.Spot(1, 0, -6, 0),
            //     desiredSize: new go.Size(13, 13),
            //     source: '/static/images/topo-manage/dev-offline-icon.svg',
            //     toolTip: $(
            //       "ToolTip",
            //       {
            //         "Border.fill": "#021026",
            //         "Border.stroke": "#12409E",
            //         "Border.parameter1": 4
            //       },
            //       $(go.TextBlock, { margin: 4, stroke: "white", text: "离线" })
            //     ),
            //     mouseEnter: (e, obj) => {
            //       let shape = obj.part.findObject("dev-offline-icon");
            //       // shape.source = '/static/images/topo-manage/dev-offline-hover-icon.svg';
            //     },
            //     mouseLeave: (e, obj) => {
            //       let shape = obj.part.findObject("dev-offline-icon");
            //       // shape.source = '/static/images/topo-manage/dev-offline-icon.svg';
            //     }
            //   },
            //   new go.Binding(
            //     "visible",
            //     "",
            //     (model) => !model[model.category].devStatus
            //   )
            // )
          ),
          // 设备与客户端连接线节点
          $(
            go.Panel,
            "Auto",
            { margin: new go.Margin(0, 0, 0, 4) },
            $(
              go.Shape,
              "Circle",
              {
                width: 17,
                height: 17,
                fill: "#486287",
                strokeWidth: 0
              },
              new go.Binding("fill", "", (node) => {
                return node.isHighlighted || node.isSelected
                  ? "#0666ff"
                  : "#001e59";
              }).ofObject()
            ),
            $(go.Shape, "Circle", {
              width: 7,
              height: 7,
              fill: "#FFFFFF",
              strokeWidth: 0
            })
          )
        )
      );
      // 设备2信息节点模板
      that.diagram.nodeTemplateMap.add(
        "layerThreeNodeInfo2",
        $(
          go.Node,
          "Horizontal",
          { selectionAdorned: false },
          $(
            go.Panel,
            "Spot",
            {
              mouseEnter: (e, obj) => {
                if (obj.part.isHighlighted || obj.part.isSelected) return;
                let shape = obj.part.findObject("dev-bg-shape");
                shape.fill = "#551671";
              },
              mouseLeave: (e, obj) => {
                if (obj.part.isHighlighted || obj.part.isSelected) return;
                let shape = obj.part.findObject("dev-bg-shape");
                shape.fill = "#3B174B";
              }
            },
            // 背景
            $(
              go.Shape,
              "RoundedRectangle",
              {
                name: "dev-bg-shape",
                width: 140,
                height: 30,
                fill: "#3B174B",
                stroke: "#591477",
                strokeWidth: 1,
                parameter1: 4
              },
              new go.Binding("fill", "", (node) => {
                return node.isHighlighted || node.isSelected
                  ? "#8322AE"
                  : "#3B174B";
              }).ofObject()
            ),
            // 设备名称
            $(
              go.TextBlock,
              {
                stroke: "white",
                font: "14px Microsoft YaHei",
                alignment: go.Spot.Center,
                toolTip: $(
                  "ToolTip",
                  {
                    "Border.fill": "#021026",
                    "Border.stroke": "#12409E",
                    "Border.parameter1": 4
                  },
                  $(
                    go.TextBlock,
                    { margin: 4, stroke: "white" },
                    new go.Binding(
                      "text",
                      "",
                      (model) => model[model.category].devName
                    )
                  )
                )
              },
              new go.Binding(
                "text",
                "",
                (model) => model[model.category].devName
              )
            )
          ),

          // 设备与客户端连接线节点
          $(
            go.Panel,
            "Auto",
            { margin: new go.Margin(0, 0, 0, 4) },
            $(
              go.Shape,
              "Circle",
              {
                width: 17,
                height: 17,
                fill: "#486287",
                strokeWidth: 0
              },
              new go.Binding("fill", "", (node) => {
                return node.isHighlighted || node.isSelected
                  ? "#0666ff"
                  : "#001e59";
              }).ofObject()
            ),
            $(go.Shape, "Circle", {
              width: 7,
              height: 7,
              fill: "#FFFFFF",
              strokeWidth: 0
            })
          )
        )
      );

      // 客户端信息节点模板
      that.diagram.nodeTemplateMap.add(
        "layerFourNodeInfo",
        $(
          go.Node,
          "Spot",
          { selectionAdorned: false },
          $(
            go.Panel,
            "Spot",
            { margin: new go.Margin(10, 0, 0, 0) },
            // 客户端与设备已连接背景
            // $(
            //   go.Picture,
            //   {
            //     desiredSize: new go.Size(81, 81)
            //     source: '/static/images/topo-manage/node-connected-bg.svg',
            //   },
            //   new go.Binding("visible", "", (node) => {
            //     return node.isHighlighted || node.isSelected;
            //   }).ofObject()
            // ),
            // 矩形背景
            $(go.Shape, "RoundedRectangle", {
              width: 81,
              height: 81,
              fill: "#011e59",
              stroke: "#1059db",
              strokeWidth: 1,
              parameter1: 4
            }),
            // 客户端图标
            // $(
            //   go.Picture,
            //   {
            //     name: "node-icon",
            //     desiredSize: new go.Size(71, 63),
            //     source: '/static/images/topo-manage/node-icon.svg',
            //     mouseEnter: (e, obj) => {
            //       let shape = obj.part.findObject("node-icon");
            //       shape.source = '/static/images/topo-manage/node-hover-icon.svg';
            //     },
            //     mouseLeave: (e, obj) => {
            //       let shape = obj.part.findObject("node-icon");
            //       shape.source = '/static/images/topo-manage/node-icon.svg';
            //     }
            //   },
            //   new go.Binding(
            //     "visible",
            //     "",
            //     (model) => (model[model.category].nodeStatus || 0) < 90
            //   )
            // ),
            // 矩形背景
            $(go.Shape, "RoundedRectangle", {
              width: 71,
              height: 63,
              fill: "#002e59",
              stroke: "#0359db",
              strokeWidth: 1,
              parameter1: 4
            }),
            // 高危客户端图标
            // $(
            //   go.Picture,
            //   {
            //     name: "node-high-risk-icon",
            //     desiredSize: new go.Size(71, 63),
            //     source: '/static/images/topo-manage/node-high-risk-icon.svg',
            //     toolTip: $(
            //       "ToolTip",
            //       {
            //         "Border.fill": "#021026",
            //         "Border.stroke": "#12409E",
            //         "Border.parameter1": 4
            //       },
            //       $(go.TextBlock, {
            //         margin: 4,
            //         stroke: "white",
            //         text: "高风险"
            //       })
            //     ),
            //     mouseEnter: (e, obj) => {
            //       let shape = obj.part.findObject("node-high-risk-icon");
            //       // shape.source = '/static/images/topo-manage/node-high-risk-hover-icon.svg';
            //     },
            //     mouseLeave: (e, obj) => {
            //       let shape = obj.part.findObject("node-high-risk-icon");
            //       // shape.source = '/static/images/topo-manage/node-high-risk-icon.svg';
            //     }
            //   },
            //   new go.Binding(
            //     "visible",
            //     "",
            //     (model) => (model[model.category].nodeStatus || 0) >= 90
            //   )
            // ),
            // 客户端未保护图标
            // $(
            //   go.Picture,
            //   {
            //     name: "node-unprotected-icon",
            //     desiredSize: new go.Size(21, 21),
            //     // source: '/static/images/topo-manage/node-unprotected-icon.svg',
            //     alignment: new go.Spot(1, 0, -10, 16),
            //     toolTip: $(
            //       "ToolTip",
            //       {
            //         "Border.fill": "#021026",
            //         "Border.stroke": "#12409E",
            //         "Border.parameter1": 4
            //       },
            //       $(go.TextBlock, {
            //         margin: 4,
            //         stroke: "white",
            //         text: "未保护"
            //       })
            //     ),
            //     mouseEnter: (e, obj) => {
            //       let shape = obj.part.findObject("node-unprotected-icon");
            //       shape.source = '/static/images/topo-manage/node-unprotected-hover-icon.svg';
            //     },
            //     mouseLeave: (e, obj) => {
            //       let shape = obj.part.findObject("node-unprotected-icon");
            //       shape.source = '/static/images/topo-manage/node-unprotected-icon.svg';
            //     }
            //   },
            //   new go.Binding(
            //     "visible",
            //     "",
            //     (model) => !model[model.category].isProtected
            //   )
            // ),
            // 客户端名字
            $(
              go.TextBlock,
              {
                stroke: "#88C4FF",
                font: "13px Microsoft YaHei",
                alignment: new go.Spot(0.5, 1, 0, 24),
                textAlign: "center",
                verticalAlignment: go.Spot.Top,
                height: 34,
                width: 80,
                maxLines: 2,
                overflow: go.TextBlock.OverflowEllipsis,
                toolTip: $(
                  "ToolTip",
                  {
                    "Border.fill": "#021026",
                    "Border.stroke": "#12409E",
                    "Border.parameter1": 4
                  },
                  $(
                    go.TextBlock,
                    { margin: 4, stroke: "white" },
                    new go.Binding(
                      "text",
                      "",
                      (model) => model[model.category].nodeName
                    )
                  )
                )
              },
              new go.Binding(
                "text",
                "",
                (model) => model[model.category].nodeName
              ),
              new go.Binding("stroke", "", (node) => {
                return node.isHighlighted || node.isSelected
                  ? "#64F8FF"
                  : "#88C4FF";
              }).ofObject()
            )
          )
        )
      );

      // 添加客户端节点模板
      that.diagram.nodeTemplateMap.add(
        "layerFourNodeInfo2",
        $(
          go.Node,
          "Spot",
          {
            selectionAdorned: false,
            padding: 22,
            cursor: "pointer",
            click: (e, obj) => {
              let data = obj.part.data;
              that.$emit("addnodeClick", data);
            }
          },
          // $(go.Picture, {
          //   name: "add-node-icon",
          //   margin: new go.Margin(4, 0, 0, 0),
          //   desiredSize: new go.Size(52, 52),
          //   source: '/static/images/topo-manage/add-node-icon.svg',
          //   mouseEnter: (e, obj) => {
          //     let shape = obj.part.findObject("add-node-icon");
          //     shape.source = '/static/images/topo-manage/add-node-hover-icon.svg';
          //   },
          //   mouseLeave: (e, obj) => {
          //     let shape = obj.part.findObject("add-node-icon");
          //     shape.source = '/static/images/topo-manage/add-node-icon.svg';
          //   }
          // }),
          // 矩形背景
          $(go.Shape, "RoundedRectangle", {
            width: 52,
            height: 52,
            fill: "#001e59",
            stroke: "#0059db",
            strokeWidth: 1,
            parameter1: 4
          }),
          $(go.TextBlock, {
            stroke: "#88C4FF",
            font: "14px Microsoft YaHei",
            alignment: new go.Spot(0.5, 1, 0, 28),
            text: "添加"
          })
        )
      );

      // 连接线默认模板
      that.diagram.linkTemplate = $(
        go.Link,
        {
          selectable: false,
          routing: go.Link.Orthogonal
        },
        $(go.Shape, { stroke: "#3386FF" })
      );

      // 设备连接线模板
      let devLinkObj = $(
        go.Link,
        {
          selectable: false,
          routing: go.Link.Normal,
          curve: go.Link.Bezier
        },
        $(go.Shape, {
          name: "dev-link-shape",
          stroke: "#3EF1FF",
          strokeWidth: 1,
          visible: false,
          strokeDashArray: [3, 3]
        }),
        // 连接线起点样式
        $(go.Shape, { fromArrow: "" }),
        // 连接线终点样式
        $(go.Shape, {
          name: "dev-link-toArrow",
          toArrow: "Circle",
          fill: "#3EF1FF",
          stroke: "transparent"
        })
      );
      that.diagram.linkTemplateMap.add("layerThreeLinkInfo", devLinkObj);
      that.diagram.linkTemplateMap.add("layerThreeLinkInfo2", devLinkObj);

      // 一级部门节点模板
      let groupOneObj = $(
        go.Group,
        "Auto",
        {
          layout: $(go.GridLayout, { wrappingColumn: 1 }),
          selectionAdorned: false
        },
        // 外层形状
        $(go.Shape, "RoundedRectangle", {
          fill: "rgba(44,130,255,0.15)",
          stroke: "#1F5CBF",
          strokeDashArray: [3, 3]
        }),
        // 标题
        $(
          go.Panel,
          "Table",
          {
            cursor: "pointer",
            click: that.clickDepartOne,
            defaultAlignment: go.Spot.Left
          },
          $(go.Placeholder, { row: 1, padding: 6 }),
          $(
            go.Panel,
            "Auto",
            $(go.Shape, "RoundedRectangle", {
              fill: $(go.Brush, "Linear", {
                0.0: "rgba(59,72,179,1)",
                1.0: "rgba(59,72,179,0.5)",
                start: go.Spot.Left,
                end: go.Spot.Right
              }),
              stroke: null,
              margin: 5,
              height: 30
            }),
            $(
              go.Panel,
              "Horizontal",
              { margin: new go.Margin(0, 15) },
              $(
                go.TextBlock,
                {
                  font: "bold 16px Sans-Serif",
                  stroke: "white"
                },
                new go.Binding(
                  "text",
                  "",
                  (model) => model[model.category].name
                )
              ),
              // $(
              //   go.Picture,
              //   {
              //     desiredSize: new go.Size(9, 9),
              //     margin: new go.Margin(0, 30, 0, 10)
              //     source: '/static/images/topo-manage/expanded-icon.svg',
              //   }
              //   new go.Binding('source', '', model => {
              //       model.isExpand === undefined && (model.isExpand = true); // 初始值设置为展开
              //       return model.isExpand ? '/static/images/topo-manage/expanded-icon.svg' : '/static/images/topo-manage/collapsed-icon.svg';
              //   }),
              // )
              $(
                go.TextBlock,
                {
                  font: "bold 16px Sans-Serif",
                  stroke: "white",
                  margin: new go.Margin(0, 15),
                },
                new go.Binding('text', '', model => {
                    model.isExpand === undefined && (model.isExpand = true); // 初始值设置为展开
                    return model.isExpand ? '-' : '+';
                }),
              ),
            )
          )
        )
      );
      that.diagram.groupTemplateMap.add("layerFourGroupOneInfo", groupOneObj);

      // 二级部门节点模板
      let groupTwoObj = $(
        go.Group,
        "Auto",
        {
          layout: $(go.GridLayout, {
            wrappingColumn: 8,
            spacing: new go.Size(14, 0)
          }),
          selectionAdorned: false
        },
        // 外层形状
        $(go.Shape, "RoundedRectangle", {
          fill: "rgba(51,51,51,0.4)",
          stroke: "#1F5CBF",
          strokeDashArray: [3, 3]
        }),
        // 标题
        $(
          go.Panel,
          "Table",
          {
            cursor: "pointer",
            click: that.clickDepartTwo,
            defaultAlignment: go.Spot.Left,
            width: 900
          },
          $(go.Placeholder, { row: 1, padding: 6 }),
          $(go.RowColumnDefinition, {
            row: 0,
            background: "rgba(51,51,51,0.4)"
          }),
          $(
            go.Panel,
            "Horizontal",
            { margin: new go.Margin(8, 30) },
            $(
              go.TextBlock,
              {
                font: "14px",
                stroke: "white"
              },
              new go.Binding("text", "", (model) => model[model.category].name)
            ),
            // $(
            //   go.Picture,
            //   {
            //     desiredSize: new go.Size(9, 9),
            //     margin: 10
            //   }
            //   new go.Binding('source', 'isSubGraphExpanded', e => {
            //       return e ? '/static/images/topo-manage/expanded-icon.svg' : '/static/images/topo-manage/collapsed-icon.svg';
            //   }).ofObject(),
            // )
              $(
                go.TextBlock,
                {
                  font: "bold 16px Sans-Serif",
                  stroke: "white",
                  margin: new go.Margin(0, 15),
                },
                new go.Binding('text', 'isSubGraphExpanded', e => {
	                  return e ? '-' : '+';
                }).ofObject(),
              ),
          )
        )
      );
      that.diagram.groupTemplateMap.add("layerFourGroupTwoInfo", groupTwoObj);

      // 节点选中监听事件
      that.diagram.addDiagramListener(
        "ChangedSelection",
        that.updateHighlights
      );
      // 视图可见区域改变的监听事件
      that.diagram.addDiagramListener("ViewportBoundsChanged", function (e) {
        e.diagram.padding = (1 / e.diagram.scale) * 70; // 设置 padding 始终保持 70px
      });

      that.updateModel(that.topologyData);
    },

    // 绘制连接的节点样式和线
    updateHighlights() {
      let that = this;
      // 获取选中的节点（图表设置了最多只能选择一个节点，即 first() 取到的节点是当前选中的节点）
      let sel = that.diagram.selection.first();
      if (sel === null) {
        // 设置所有节点为未选中状态
        that.diagram.nodes.each((node) => {
          node.isHighlighted = false;
        });
        // 设置设备连接线初始值为隐藏
        that.diagram.links.each((link) => {
          if (
            link.data.category === "layerThreeLinkInfo" ||
            link.data.category === "layerThreeLinkInfo2"
          ) {
            let shp1 = link.findObject("dev-link-shape");
            let shp2 = link.findObject("dev-link-toArrow");
            shp1.visible = false;
            shp2.visible = false;
          }
        });
        return;
      }

      // 根据选中的节点分别设置相关的节点和连接线高亮
      if (
        sel.data.category !== "layerFourGroupOneInfo" &&
        sel.data.category !== "layerFourGroupTwoInfo"
      ) {
        // 设置所有节点为未选中状态
        that.diagram.nodes.each((node) => {
          node.isHighlighted = false;
        });
        // 设置设备连接线初始值为隐藏
        that.diagram.links.each((link) => {
          if (
            link.data.category === "layerThreeLinkInfo" ||
            link.data.category === "layerThreeLinkInfo2"
          ) {
            let shp1 = link.findObject("dev-link-shape");
            let shp2 = link.findObject("dev-link-toArrow");
            shp1.visible = false;
            shp2.visible = false;
          }
        });

        that.showDevLink(sel);
        that.highlightNode(sel);
      }
    },

    /**
     * 显示隐藏的设备连接线，x 为当前选中的节点
     * @param x
     */
    showDevLink(x) {
      if (x instanceof go.Node) {
        // 选择的是设备节点
        if (
          x.data.category === "layerThreeNodeInfo" ||
          x.data.category === "layerThreeNodeInfo2"
        ) {
          // 所有 从该节点出去 的线设置为显示
          x.findLinksOutOf().each((link) => {
            let shp1 = link.findObject("dev-link-shape");
            let shp2 = link.findObject("dev-link-toArrow");
            shp1.visible = true;
            shp2.visible = true;
          });
        }
        // 选择的是客户端节点
        if (x.data.category === "layerFourNodeInfo") {
          x.findLinksInto().each((link) => {
            // 所有 指向该节点 的线设置为显示
            let shp1 = link.findObject("dev-link-shape");
            let shp2 = link.findObject("dev-link-toArrow");
            shp1.visible = true;
            shp2.visible = true;
          });
        }
      }
    },

    // 高亮选中节点连接的节点背景
    highlightNode(x) {
      if (x instanceof go.Node) {
        // 选择的是设备节点
        if (
          x.data.category === "layerThreeNodeInfo" ||
          x.data.category === "layerThreeNodeInfo2"
        ) {
          // 所有 目标节点 设置高亮样式
          x.findNodesOutOf().each((node) => {
            node.isHighlighted = true;
          });
        }
        // 选择的是客户端节点
        if (x.data.category === "layerFourNodeInfo") {
          // 所有 源节点 设置高亮样式
          x.findNodesInto().each((node) => {
            node.isHighlighted = true;
          });
        }
      }
    },

    /**
     * 点击一级部门节点，展开/收起所有二级部门节点，e: 输入事件，鼠标或键盘触发, obj: 当前点击的节点对象
     * @param e
     * @param obj
     */
    clickDepartOne(e, obj) {
      // 改变收起/展开图标，使用 set 方法确保更改属性值后视图更新
      this.diagram.model.commit(function (m) {
        m.set(obj.part.data, "isExpand", !obj.part.data.isExpand);
      });

      let type = obj.part.data.isExpand ? "expand" : "collapse";
      this.diagram.nodes.each((node) => {
        // 循环所有节点
        if (node.containingGroup === obj.part) {
          // 如果节点的父容器是点击的一级部门
          this.clickDepartTwo(null, node, type);
        }
      });
    },

    /**
     * 展开/收起点击的二级部门节点
     * e: 输入事件，鼠标或键盘触发
     * obj: 当前点击的节点对象
     * type: 指定 展开/收起 操作
     * @param e
     * @param obj
     * @param type
     */
    clickDepartTwo(e, obj, type) {
      let group = obj.part;
      // 判断节点是否是 Group 节点
      if (group instanceof go.Adornment) group = group.adornedPart;
      if (!(group instanceof go.Group)) return;

      // 判断有没有图层
      let diagram = group.diagram;
      if (diagram === null) return;

      // 判断节点能否收起/展开
      let cmd = diagram.commandHandler; // 获取图层指令
      if (group.isSubGraphExpanded) {
        if (!cmd.canCollapseSubGraph(group)) return; // 如果 group 不能收起，return
      } else {
        if (!cmd.canExpandSubGraph(group)) return; // 如果 group 不能展开，return
      }

      // 如果指定了 type，则按 type 与 节点当前展开状态 来决定展开/收起
      if (type) {
        if (type === "collapse" && group.isSubGraphExpanded) {
          cmd.collapseSubGraph(group); // 收起
        } else if (type === "expand" && !group.isSubGraphExpanded) {
          cmd.expandSubGraph(group); // 展开
        }
      } else {
        // 如果未指定 type，则按 节点当前展开状态 来决定展开/收起
        if (group.isSubGraphExpanded) {
          cmd.collapseSubGraph(group); // 收起
        } else {
          cmd.expandSubGraph(group); // 展开
        }
      }
    },

    // 一键缩放
    zoomToFit() {
      this.diagram.commandHandler.zoomToFit();
    },

    // 全部收起或展开
    collapseOrExpandAll(type) {
      this.diagram.nodes.each((node) => {
        // 改变所有一级部门图标收起/展开状态
        if (node.category === "layerFourGroupOneInfo") {
          // 改变收起/展开图标，使用 set 方法确保更改属性值后视图更新
          this.diagram.model.commit(function (m) {
            m.set(node.part.data, "isExpand", type === "expand");
          });
        }

        // 展开/收起所有二级部门
        if (node.category === "layerFourGroupTwoInfo") {
          this.clickDepartTwo(null, node, type);
        }
      });
    },

    // 全屏状态切换
    fullscreenToggle() {
      this.$refs["fullscreen"].toggle();
    },
    // 全屏状态切换的回调
    fullscreenChange(fullscreen) {
      this.isFullscreen = fullscreen;
    }
  }
});
myApp = new Vue({
  el: "#sample",
  data: {
    diagramData: topoChartData
  }
});
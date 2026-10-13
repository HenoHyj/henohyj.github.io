export const profile = {
  name: 'Yijie He', chineseName: '贺逸杰', email: 'henob22@gmail.com', github: 'https://github.com/HenoHyj',
  en: {
    role: 'AI infrastructure & GPU computing',
    intro: 'I work on the systems behind model inference — GPU kernels, low-precision computation, and the paths that connect them.',
    about: 'I’m a Computer Engineering master’s student at UC San Diego. My work spans GPU kernel optimization at ByteDance, on-device AI infrastructure at Qualcomm, and medical computer vision research at ARC Lab. I also build inference tools and practical software outside of work.',
    note: 'I like working through the details: where time goes, how data moves, and whether a change holds up when measured.',
  },
  zh: {
    role: 'AI 基础设施与 GPU 计算',
    intro: '我关注模型推理背后的系统：GPU 算子、低精度计算，以及连接计算与硬件的执行路径。',
    about: '我正在 UC San Diego 攻读计算机工程硕士。曾在字节跳动优化 GPU 算子，在高通参与端侧 AI 基础设施开发，在 ARC Lab 从事医学计算机视觉研究。工作之外，我也开发推理工具和日常使用的软件。',
    note: '我喜欢把问题拆到具体环节：时间花在哪里，数据怎样流动，一次改动是否经得起测量。',
  },
};

const p = (en, zh) => ({ en, zh });
export const experience = [
  { company: 'ByteDance', place: p('AML · Heterogeneous Hardware', 'AML · 异构硬件'), date: p('Jun — Oct 2026', '2026.06 — 2026.10'), role: p('AI Infrastructure Intern', 'AI Infra 实习生'),
    description: p('Developed and optimized core video-generation kernels on AMD MI300X and MI355X: sparse attention, convolution, and communication–compute overlap.', '在 AMD MI300X / MI355X 上开发和优化视频生成模型的核心算子，覆盖稀疏注意力、卷积，以及通信与计算重叠。'),
    details: [p('Implemented an INT8 QK / FP8 PV attention path with block summaries and sparse routing.', '实现 INT8 QK / FP8 PV 注意力路径，结合块摘要与稀疏路由。'), p('Optimized Conv1D / Conv2D dispatch, layout conversion, and weight packing; made outputs consistent across solution changes.', '优化 Conv1D / Conv2D 分发、布局转换和权重预打包，消除 solution 切换带来的输出差异。'), p('Worked on chunked MoE All-to-All pipelines and asynchronous execution.', '参与分块 MoE All-to-All 流水线与异步执行优化。')] },
  { company: 'Qualcomm', place: p('San Diego · On-device AI', '圣地亚哥 · 端侧 AI'), date: p('Jun — Sep 2025', '2025.06 — 2025.09'), role: p('Software Engineering Intern · AI Infrastructure', '软件工程实习生 · 端侧 AI Infra'),
    description: p('Ported and tuned FlashAttention-2 for an in-house mobile GPU, focusing on long-sequence inference, memory access, and local data reuse.', '在高通自研端侧 GPU 上移植与调优 FlashAttention-2，重点解决长序列推理中的访存与局部数据复用问题。'),
    details: [p('Adjusted tiling and memory access to reduce repeated reads and relieve bandwidth bottlenecks.', '调整分块和访存方式，减少重复读取，缓解带宽瓶颈。'), p('Used low-level instructions to address register spills; measured a 34% throughput improvement on the target workload.', '结合底层指令消除寄存器溢出，在目标负载上测得吞吐量提升 34%。'), p('Used internal profiling and hardware instrumentation to guide and validate kernel changes.', '使用内部 Profiler 与硬件打点定位瓶颈，指导并验证算子迭代。')] },
  { company: 'Settlyfe', place: p('San Diego · Backend', '圣地亚哥 · 后端'), date: p('Jun 2025 — Jan 2026', '2025.06 — 2026.01'), role: p('Backend Engineering Intern', '后端开发实习生'),
    description: p('Built a lease-review RAG pipeline and an item-based recommendation system, supported by Spring Boot APIs, Redis, and MySQL.', '开发租房合同审查 RAG 流程和物品协同过滤推荐系统，结合 Spring Boot、Redis 与 MySQL 支撑后端服务。'),
    details: [p('Integrated retrieval into contract review and improved similarity scoring for recommendations.', '将检索流程接入合同审查，并改进推荐系统的相似度计算。'), p('Designed RESTful APIs and tuned database schemas for frequent AI-driven requests.', '设计 RESTful API，针对高频 AI 请求优化数据库结构。')] },
  { company: 'UC San Diego · ARC Lab', place: p('Medical computer vision · Michael Yip', '医学计算机视觉 · Michael Yip'), date: p('Apr 2024 — Jun 2025', '2024.04 — 2025.06'), role: p('Research Assistant', '研究助理'),
    description: p('Worked on segmentation and fragmentation detection in kidney-stone surgery videos. Co-author of a paper in Lasers in Medical Science.', '研究肾结石手术视频中的分割与碎片事件检测。相关工作发表于 Lasers in Medical Science，我为共同作者。'),
    details: [p('Adapted SAM using feature fusion for limited clinical data; developed clustering and 2D tracking for fragment analysis.', '结合特征融合适配 SAM，在有限临床数据上开展分割，并以聚类和二维跟踪分析碎片。'), p('Trained LoRA adapters and evaluated model behavior on fragmentation events.', '训练 LoRA 适配器，并评估模型在碎片生成事件中的表现。')] },
];

export const projects = [
  {
    slug: 'gpu-kernels', category: 'kernels', graphic: 'attention', featured: true, year: '2026',
    title: p('Attention, convolution & GPU dataflow', '注意力、卷积与 GPU 数据流'),
    subtitle: p('AMD MI300X / MI355X · ByteDance', 'AMD MI300X / MI355X · 字节跳动'),
    summary: p('Optimizing the kernels that sit on the critical path of video generation.', '优化视频生成关键执行路径上的核心算子。'),
    tags: ['HIP', 'ROCm', 'INT8 / FP8', 'Composable Kernel'],
    metrics: [p(['1.82×', 'attention speedup'], ['1.82×', '注意力算子加速']), p(['+32%', 'Conv1D performance'], ['+32%', 'Conv1D 性能']), p(['+20%', 'Conv2D performance'], ['+20%', 'Conv2D 性能'])],
    scope: p('Target-workload measurements reported in my resume. Attention uses quantized block-summary approximation; these are operator results, not an end-to-end model speedup.', '数字来自简历中的目标负载测试。注意力路径使用量化块摘要近似；这些是算子级结果，不代表模型端到端加速。'),
    sections: [
      { title: p('Sparse attention', '稀疏注意力'), text: p('Combined VSA with Sol Attention to split selected blocks into exact computation and summary approximation. Implemented INT8 QK / FP8 PV HIP kernels, summary generation, and a second-stage routing path. The work focused on memory reuse and reducing both attention and preprocessing overhead.', '结合 VSA 与 Sol Attention，将选中块区分为精确计算与摘要近似。实现 INT8 QK / FP8 PV HIP Kernel、摘要生成与二次分区路由，优化访存复用并降低注意力和预处理开销。'), bullets: [p('Adapted the attention interface to externally supplied routes and CSR metadata.', '将注意力接口适配到外部路由与 CSR 元数据。'), p('Used controlled comparisons to evaluate routing storage, internal sorting, and zero-mass handling.', '通过受控对照评估路由存储、内部排序与零质量行处理。'), p('Adapted execution and memory layouts separately for MI300X and MI355X.', '分别适配 MI300X 与 MI355X 的执行结构和存储布局。')] },
      { title: p('Convolution paths', '卷积执行路径'), text: p('For Conv1D, fused layout and precision conversion, cached packed weights, and decomposed transposed convolution by stride to avoid ineffective computation. For Conv2D, adjusted tile shapes to output channels and spatial dimensions, used vectorized layout conversion, and wrote directly into the target output layout.', 'Conv1D 路径融合布局与精度转换，缓存预打包权重，并按步长分解转置卷积以跳过无效计算。Conv2D 路径按输出通道和空间尺寸调整分块，结合向量化布局转换与目标布局直接写回。'), bullets: [p('Measured approximately 32% and 20% performance gains over MIOpen on the respective target workloads.', '对应目标负载上，较 MIOpen 测得约 32% 与 20% 的性能提升。'), p('Removed output differences introduced by solution switching and checked bitwise consistency for the same input.', '消除 solution 切换导致的输出差异，验证相同输入下的逐位一致性。')] },
      { title: p('Communication and computation', '通信与计算'), text: p('Developed a MoE All-to-All path using chunked pipelines, asynchronous execution, and three-level buffering to overlap communication with computation. The target SP8 configuration achieved a reported 1.84× speedup over the original implementation.', '开发 MoE All-to-All 路径，通过分块流水线、异步执行与三级缓冲实现通算重叠。在简历记录的目标 SP8 配置下，较原实现取得 1.84× 加速。') },
    ],
  },
  {
    slug: 'multimodal-inference', category: 'systems', graphic: 'routing', featured: true, year: '2026',
    title: p('Multimodal inference on AMD GPUs', 'AMD GPU 上的多模态推理'), subtitle: p('vLLM-Omni · MiniMax H3', 'vLLM-Omni · MiniMax H3'),
    summary: p('Work-aware routing, fused execution, and cancellation across ranks.', '工作量感知路由、融合执行与跨 rank 取消。'), tags: ['vLLM-Omni', 'HIP', 'Distributed inference'],
    metrics: [p(['+11.44%', 'effective throughput'], ['+11.44%', '有效吞吐']), p(['3.19×', 'compute + packing'], ['3.19×', '计算与打包路径']), p(['−21%', 'completion time'], ['−21%', '完成耗时'])],
    scope: p('Separate experiments: mixed requests on a dual four-GPU topology; a fixed-shape fusion benchmark; and an eight-GPU test with 25% early cancellation. The gains are not additive.', '分别对应双四卡混合请求测试、固定形状融合路径测试，以及八卡 25% 请求早期取消测试。各项收益不能相加。'),
    sections: [
      { title: p('Routing requests', '请求路由'), text: p('Deployed MiniMax H3 through vLLM-Omni on AMD GPUs. Fixed a fallback that ignored multi-replica configuration, then implemented workload-aware routing with load reservation, release, and rollback on errors. On the same dual four-GPU topology, the mixed long/short request test improved effective end-to-end throughput by 11.44%.', '基于 vLLM-Omni 在 AMD GPU 上部署 MiniMax H3，修复回退逻辑忽略多副本配置的问题。实现工作量感知路由以及负载预留、释放和异常回滚，在相同双四卡拓扑的长短混合请求测试中，有效端到端吞吐提升 11.44%。') },
      { title: p('Fusing the execution path', '融合执行路径'), text: p('Following the Sol-H3 design, combined QKV exchange and fused QKNorm / RoPE with the send layout. This reduced communication calls and intermediate tensor reads and writes. The fixed-shape compute-and-packing path measured 3.19× faster than the original path.', '参考 Sol-H3 设计，实现 QKV 合并交换，并将 QKNorm / RoPE 与发送布局融合，减少通信调用和中间张量读写。固定形状下，计算与打包路径较原路径加速 3.19×。') },
      { title: p('Stopping work safely', '一致地终止无效计算'), text: p('Adapted in-flight cancellation using shared-memory signals and coordinated rank exit. Also corrected nondeterministic audio decoding. In an eight-GPU test with 25% early cancellation, valid requests completed in 21% less total time, with audio and video output consistency verified.', '通过共享内存信号和跨 rank 一致退出，适配运行中取消机制；同时修复音频解码的非确定性问题。八卡 25% 请求早期取消测试中，有效请求全部完成耗时降低 21%，并验证音视频输出一致。') },
    ],
  },
  {
    slug: 'amd-kernel-agent', category: 'systems', graphic: 'loop', featured: true, year: '2026 —',
    title: p('An AMD kernel optimization agent', 'AMD 算子优化 Agent'), subtitle: p('Independent project · HIP / ROCm', '个人开发 · HIP / ROCm'),
    summary: p('A development loop where code, correctness, profiling, and measurements stay connected.', '连接代码、正确性、profiling 与性能测量的开发流程。'), tags: ['Python', 'HIP / ROCm', 'Coding agents', 'Profiling'],
    metrics: [],
    scope: p('An actively developed prototype. Individual experiments are validated against their own benchmark contracts; automatic generation does not guarantee a faster kernel.', '持续开发中的原型。各项实验依据自己的 benchmark contract 验证；自动生成实现并不保证算子更快。'),
    sections: [
      { title: p('Keeping the experiment accountable', '让实验结论可以核对'), text: p('Built a workflow for HIP / ROCm kernel optimization that connects code generation, compilation, correctness checks, profiling, and supervised review. A predefined benchmark contract controls acceptance, and measured feedback drives the next iteration.', '独立开发 HIP / ROCm 算子优化流程，连接代码生成、编译、正确性验证、profiling 与监督审查。使用预设 benchmark contract 约束验收，以实测反馈驱动下一轮迭代。'), bullets: [p('Separate candidate development from final correctness and performance acceptance.', '将候选开发与最终正确性、性能验收分开。'), p('Preserve the implementation and measurement evidence associated with each experiment.', '保存每次实验对应的实现与测量证据。'), p('Reuse AMD architecture knowledge and bottleneck-specific tuning rules.', '复用 AMD 架构知识与面向具体瓶颈的调优规则。')] },
      { title: p('Hardware-aware iteration', '面向硬件的迭代'), text: p('Applied the workflow to MoE, convolution, and VSA tasks, including cross-architecture adaptation to MI300X. The supporting vibeHIP work includes a real CLI worker, HIP compilation, correctness and timing checks, and compile-error recovery within a single worker session.', '将流程用于 MoE、卷积和 VSA 场景，包括向 MI300X 的跨架构适配。配套 vibeHIP 工作已接通真实 CLI worker、HIP 编译、正确性和计时检查，并支持在同一次 worker 调用内修复编译错误。') },
    ],
  },
  {
    slug: 'low-precision-kernels', category: 'kernels', graphic: 'precision', featured: true, year: '2026',
    title: p('Low-precision kernels on Blackwell', 'Blackwell 上的低精度算子'), subtitle: p('RTX 5090 · CUDA / Triton / CUTLASS', 'RTX 5090 · CUDA / Triton / CUTLASS'),
    summary: p('From FP4 bit layouts to a working Tensor Core execution path.', '从 FP4 位布局到可运行的 Tensor Core 执行路径。'), tags: ['CUDA', 'Triton', 'CUTLASS', 'NVFP4', 'TMA'],
    metrics: [p(['~2×', 'target GEMM speedup'], ['约 2×', '目标 GEMM 加速'])], scope: p('Compared with a BF16 baseline on the target test workload; this is a kernel benchmark, not a universal model-inference speedup.', '在目标测试负载上与 BF16 基线比较，为算子级测试，不代表所有模型推理都获得相同加速。'),
    sections: [
      { title: p('Rebuilding core operators', '复现核心算子'), text: p('Implemented and benchmarked Grouped Swizzling GEMM and FlashAttention-2 using CUDA and Triton. The work used implementation comparisons to understand scheduling, data movement, and inference-oriented kernel behavior.', '使用 CUDA 与 Triton 编写、复现并比较 Grouped Swizzling GEMM 和 FlashAttention-2，通过实现对照理解任务调度、数据搬运与推理场景下的算子行为。') },
      { title: p('Making FP4 run on consumer hardware', '让 FP4 在消费级硬件上运行'), text: p('Investigated NVFP4 GEMM compatibility on the RTX 5090 with CUTLASS, adjusted layouts and computation paths, and implemented CUDA bitwise FP4 encoding and decoding. Preallocated workspaces and enabled Tensor Core / TMA paths, reaching approximately 2× the BF16 baseline on the target workload.', '基于 CUTLASS 排查 RTX 5090 上 NVFP4 GEMM 的兼容性问题，调整数据布局与计算路径；实现 CUDA 位操作 FP4 编解码和工作区预分配，启用 Tensor Core / TMA 路径，在目标负载上较 BF16 基线取得约 2× 加速。') },
    ],
  },
  {
    slug: 'systolic-accelerator', category: 'hardware', graphic: 'array', featured: false, year: '2025',
    title: p('A 2D systolic-array AI accelerator', '二维脉动阵列 AI 加速器'), subtitle: p('ECE 284 · UC San Diego', 'ECE 284 · UC San Diego'),
    summary: p('RTL, mixed-precision quantization, FPGA validation, and physical design.', 'RTL、混合精度量化、FPGA 验证与物理设计。'), tags: ['SystemVerilog', 'VGG16', 'FPGA', 'OpenROAD'],
    metrics: [], scope: p('Academic team project. The linked repository is a fork containing the coursework implementation and reports.', '课程团队项目。关联仓库为包含课程实现与报告的 fork。'),
    links: [{ label: p('Browse repository', '查看仓库'), url: 'https://github.com/HenoHyj/2D-Systolic-Accelerator' }],
    sections: [
      { title: p('Architecture and quantization', '架构与量化'), text: p('Implemented a matrix-multiplication core with switchable weight-stationary and output-stationary dataflows. Evaluated greedy 4-bit / 2-bit mixed-precision quantization for VGG16 and built an SFP module with lookup tables for nonlinear activation functions.', '实现支持 Weight Stationary 与 Output Stationary 数据流切换的矩阵乘法内核，对 VGG16 验证贪婪 4/2-bit 混合精度量化，并使用 LUT 构建支持非线性激活的 SFP 模块。') },
      { title: p('From simulation to hardware', '从仿真走向硬件'), text: p('Performed hardware–software functional verification on an RFSoC 4×2 Pynq FPGA board and ran an OpenROAD physical-design flow with a 130 nm process: synthesis, placement, and routing. The repository contains baseline, SIMD, reconfigurable-array, and integration milestones.', '在 RFSoC 4×2 Pynq FPGA 板卡上完成软硬协同功能验证，跑通 130 nm 工艺下的 OpenROAD 综合、布局和布线流程。仓库保留基线、SIMD、可重构阵列和集成阶段的实现。') },
    ],
  },
  {
    slug: 'surgical-vision', category: 'research', graphic: 'vision', featured: false, year: '2024 — 2025',
    title: p('Computer vision for surgical video', '手术视频中的计算机视觉'), subtitle: p('ARC Lab · UC San Diego', 'ARC Lab · UC San Diego'),
    summary: p('Segmentation, tracking, and the detection of kidney-stone fragmentation.', '分割、跟踪与肾结石碎片生成事件检测。'), tags: ['SAM', 'PyTorch', 'LoRA', 'Computer vision'],
    metrics: [], scope: p('Co-authored perception research published in Lasers in Medical Science in 2026.', '以共同作者身份参与的感知研究，发表于 2026 年 Lasers in Medical Science。'),
    links: [{ label: p('Read the paper', '阅读论文'), url: 'https://doi.org/10.1007/s10103-026-04843-2' }, { label: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/41784662/' }],
    sections: [
      { title: p('Working with limited clinical data', '有限临床数据下的建模'), text: p('At ARC Lab, adapted the Segment Anything Model with feature fusion to segment kidney stones in surgical video. Developed clustering and 2D tracking for real-time fragment analysis, trained LoRA adapters, and evaluated core model metrics.', '在 ARC Lab，结合特征融合适配 Segment Anything Model，开展手术视频中的结石分割；通过聚类和二维跟踪分析碎片，训练 LoRA 适配器并评估核心模型指标。') },
      { title: p('Publication', '论文'), text: p('Detection of fragmentation while dusting during retrograde intrarenal laser lithotripsy: a novel computer vision and perception pipeline. Jonathan E. Katz, Orlando Diaz-Ramos, Christopher Yong-Zyn Lo, Jamie Finegan, Tung Yen Chiang, Yijie He, Zekai Liang, Michael Yip, Roger L. Sur, and Shan Lin. Lasers in Medical Science 41, 45 (2026).', 'Detection of fragmentation while dusting during retrograde intrarenal laser lithotripsy: a novel computer vision and perception pipeline。作者：Jonathan E. Katz、Orlando Diaz-Ramos、Christopher Yong-Zyn Lo、Jamie Finegan、Tung Yen Chiang、Yijie He、Zekai Liang、Michael Yip、Roger L. Sur、Shan Lin。Lasers in Medical Science 41, 45（2026）。') },
    ],
  },
  {
    slug: 'settlyfe-backend', category: 'systems', graphic: 'retrieval', featured: false, year: '2025 — 2026',
    title: p('Retrieval & recommendations for Settlyfe', 'Settlyfe 的检索与推荐后端'), subtitle: p('Backend engineering internship', '后端开发实习'),
    summary: p('Connecting AI features with APIs, caching, and a relational data model.', '连接 AI 功能、API、缓存与关系型数据模型。'), tags: ['Java', 'Spring Boot', 'Redis', 'MySQL', 'RAG'],
    metrics: [], scope: p('Backend engineering work completed during my Settlyfe internship.', '在 Settlyfe 实习期间完成的后端工程工作。'),
    sections: [
      { title: p('Retrieval and recommendations', '检索与推荐'), text: p('Designed and integrated a RAG pipeline for lease-contract review. Implemented an item-based collaborative-filtering recommendation engine with improved similarity scoring to shorten the search path for users.', '设计并集成租房合同审查 RAG 流程，实现基于改进相似度计算的物品协同过滤推荐引擎，缩短用户检索链路。') },
      { title: p('The service behind the feature', '功能背后的服务'), text: p('Built RESTful APIs with Java Spring Boot and Redis, and optimized MySQL schemas for frequent AI-driven requests. The work tied model-facing features to the application’s API and data layer.', '使用 Java Spring Boot 与 Redis 开发 RESTful API，并针对高频 AI 请求优化 MySQL Schema，将模型相关功能接入应用的 API 和数据层。') },
    ],
  },
  {
    slug: 'neural-ode-forecasting', category: 'research', graphic: 'series', featured: false, year: '2026',
    title: p('Forecasting with irregular observations', '不规则观测下的时序预测'), subtitle: p('Latent ODE · Scripps Pier', 'Latent ODE · Scripps Pier'),
    summary: p('Comparing continuous-time and recurrent models on real coastal sensor data.', '在真实海岸传感器数据上比较连续时间模型与循环模型。'), tags: ['Python', 'PyTorch', 'Neural ODE', 'NOAA'],
    metrics: [], scope: p('ECE 228 team project with Yifan Peng, Zihao Yang, and Zixuan Chen. Results depend on the missing-data regime.', '与 Yifan Peng、Zihao Yang、Zixuan Chen 合作的 ECE 228 课程项目。结果随缺失数据类型而变化。'),
    links: [{ label: p('Browse repository', '查看仓库'), url: 'https://github.com/HenoHyj/ECE228_Final_Project' }],
    sections: [
      { title: p('A real sensor problem', '真实传感器问题'), text: p('Compared an LSTM with a Latent ODE using NOAA observations from Scripps Pier. The task forecasts six environmental channels over 24 hours using 48 hours of history. The evaluation covers random dropout, block outages, and native irregular sampling.', '使用 Scripps Pier 的 NOAA 观测数据比较 LSTM 与 Latent ODE，以 48 小时历史预测未来 24 小时的六项环境变量。评估覆盖随机丢点、连续缺失与原生不规则采样。') },
      { title: p('What the comparison showed', '对照实验的发现'), text: p('On a clean regular grid, the LSTM performed better. Under increasingly irregular sampling, the Latent ODE’s relative skill stayed near 0.62 while the LSTM degraded from 0.48 toward 0.78. A tidal-clock ablation helped separate architectural robustness from the additional accuracy provided by periodic features.', '规则且完整的时间网格上，LSTM 表现更好。不规则采样加重时，Latent ODE 的相对 skill 保持在约 0.62，LSTM 则从 0.48 退化至约 0.78。通过移除潮汐时钟特征的消融实验，区分架构稳健性与周期特征提供的额外精度。') },
    ],
  },
];

export const skills = [
  { title: p('GPU programming', 'GPU 编程'), items: 'C / C++ · CUDA · HIP / ROCm · Triton · OpenCL · CUTLASS' },
  { title: p('Inference & ML', '推理与机器学习'), items: 'Python · PyTorch · vLLM / vLLM-Omni · SGLang · RAG · LoRA' },
  { title: p('Systems & software', '系统与软件'), items: 'Linux · Docker · Git · Java / Spring Boot · Redis · MySQL · Rust · Kotlin' },
  { title: p('Hardware', '硬件'), items: 'SystemVerilog / Verilog · FPGA · Mixed-precision quantization · OpenROAD' },
];

// TODO-CONTENT: full article bodies below are realistic placeholder
// content written for a premium enterprise edge-AI/IIoT blog. They are
// illustrative, not verified technical claims about a real deployed
// product — review and replace with real engineering content before
// this site goes live for a client audience.
//
// Each post's `body` is an ordered array of typed content blocks so
// BlogPost.jsx can render headings, paragraphs, lists, callouts, and
// quotes with distinct, purpose-built styling rather than one
// undifferentiated text blob.
//
// Block types: 'p' | 'h2' | 'h3' | 'list' | 'callout' | 'quote' | 'stat-row'

export const POSTS = {
  'latency-budgets-industrial-ai': {
    slug: 'latency-budgets-industrial-ai',
    title: 'Why inference latency matters more than model accuracy on the factory floor',
    category: 'Engineering',
    date: 'May 19, 2026',
    readTime: '8 min read',
    author: { name: 'Maya Chen', role: 'Senior ML Engineer, Edge Runtime' },
    excerpt:
      'A millisecond-level breakdown of where round-trip cloud inference loses to local processing in predictive maintenance scenarios.',
    tags: ['Latency', 'Predictive Maintenance', 'Edge Inference'],
    body: [
      { type: 'p', text: 'Most evaluations of industrial AI models start and end with accuracy. F1 score, precision-recall curves, confusion matrices — the standard machine learning scorecard. On a factory floor, that scorecard is incomplete. A model that is 99.2% accurate but takes 1.4 seconds to return a verdict is, in many failure modes, worse than a model that is 96% accurate and returns in 40 milliseconds.' },
      { type: 'p', text: 'This is not an argument against accuracy. It is an argument that latency is a first-class constraint, not an infrastructure detail to optimize after the model ships.' },

      { type: 'h2', text: 'The anatomy of a decision window' },
      { type: 'p', text: 'Consider a conveyor bearing running 2.3°C over its baseline temperature. That number alone tells you very little — bearings drift with ambient temperature, load, and lubrication cycles constantly. What matters is the rate of change and what happens in the next several hundred milliseconds.' },
      { type: 'stat-row', items: [
        { value: '400ms', label: 'Typical decision window before stall escalates' },
        { value: '180ms', label: 'Average cloud round-trip (sensor → inference → actuator)' },
        { value: '6ms', label: 'Typical edge inference round-trip on Device-Nova runtime' },
      ] },
      { type: 'p', text: 'A 180ms cloud round-trip sounds fast in absolute terms. It is not fast relative to a 400ms decision window. Add network jitter, a congested uplink, or a brief connectivity drop — not uncommon on a factory floor with dense RF interference from motors and welding equipment — and that 180ms median can spike to 600ms or more on the tail. Tail latency, not median latency, is what determines whether a bearing seizes.' },

      { type: 'callout', tone: 'amber', title: 'The tail is the failure mode', text: 'Median latency numbers are marketing numbers. Industrial decisions are made on p99 latency, because the 1-in-100 slow response is the one that coincides with an actual failure event, not a quiet Tuesday afternoon.' },

      { type: 'h2', text: 'Where the time actually goes' },
      { type: 'p', text: 'Breaking down a cloud-dependent inference path makes the problem concrete:' },
      { type: 'list', items: [
        'Sensor sampling and local buffering: 2-5ms',
        'Serialization and uplink transmission: 15-40ms (highly variable on industrial Wi-Fi or cellular backhaul)',
        'Cloud ingestion, queueing, and model inference: 20-60ms',
        'Result serialization and downlink: 15-40ms',
        'Actuator command dispatch and execution: 5-15ms',
      ] },
      { type: 'p', text: 'Every one of those steps except the first and last involves a network hop. Each hop is a place where queueing, congestion, or a dropped packet can add tens to hundreds of milliseconds with no warning. None of that variability is visible in a model accuracy benchmark run in a notebook against a static test set.' },

      { type: 'h3', text: 'What changes when inference runs locally' },
      { type: 'p', text: 'Running the same model on-device collapses the middle three steps into a single local computation. There is no serialization for a network hop, no queueing behind other tenants\' inference requests, and no uplink/downlink round trip. What remains is sensor sampling, local inference, and actuator dispatch — all on the same physical hardware, often the same bus.' },
      { type: 'p', text: 'This is not a marginal improvement. It is a change in latency class: from "network-bound, tens to hundreds of milliseconds, variable" to "compute-bound, single-digit milliseconds, predictable."' },

      { type: 'quote', text: 'Predictability matters as much as speed. A control system can be engineered around a known 6ms response time. It cannot be reliably engineered around a response time that is usually 180ms but occasionally 600ms.', attribution: 'Internal engineering review, Device-Nova edge runtime team' },

      { type: 'h2', text: 'When cloud inference is still the right call' },
      { type: 'p', text: 'None of this is an argument that edge inference is always correct. Workloads that are not time-critical — long-horizon demand forecasting, fleet-wide trend analysis, model retraining on aggregated historical data — genuinely benefit from cloud-scale compute and do not have a tight decision window. The architectural question is not "edge or cloud," it is "what is this specific decision\'s time budget, and does the inference path fit inside it."' },
      { type: 'p', text: 'In practice, most industrial deployments end up with both: edge inference for anything inside a sub-second decision window, and cloud aggregation for the slower-moving analytics that benefit from a wider data lens. The mistake is defaulting every workload to one or the other without measuring the actual decision window first.' },

      { type: 'h2', text: 'A practical framework' },
      { type: 'p', text: 'Before choosing an inference architecture for a given control loop, we recommend answering three questions:' },
      { type: 'list', items: [
        'What is the actual decision window — the time between a signal becoming actionable and the cost of inaction rising sharply?',
        'What is the realistic p99 latency of the cloud round-trip on this specific network, not an idealized lab measurement?',
        'What is the cost of a missed or late decision in this specific failure mode — a stalled bearing is not the same cost as a delayed inventory reorder?',
      ] },
      { type: 'p', text: 'If the answer to the first question is under roughly half a second, and the cost of a late decision is high, the latency budget itself answers the architecture question before accuracy benchmarks are even relevant.' },
    ],
  },

  'legacy-modbus-opcua-edge-ai': {
    slug: 'legacy-modbus-opcua-edge-ai',
    title: 'Mapping legacy Modbus and OPC-UA fleets for edge AI readiness',
    category: 'Integration',
    date: 'April 28, 2026',
    readTime: '12 min read',
    author: { name: 'David Okonkwo', role: 'Principal Solutions Architect' },
    excerpt:
      'A practical checklist for automation teams evaluating which devices in an existing fleet are ready for edge inference today.',
    tags: ['Modbus', 'OPC-UA', 'Legacy Integration', 'Fleet Readiness'],
    body: [
      { type: 'p', text: 'Most industrial sites we work with do not have a clean, modern fleet. They have a mix spanning three decades of hardware: PLCs running Modbus RTU over serial from the late 1990s, mid-2000s Ethernet/IP controllers, and a newer layer of OPC-UA-native devices installed in the last five years. Edge AI readiness is rarely a single binary answer across a site — it is a per-device, sometimes per-register question.' },

      { type: 'h2', text: 'Start with the protocol, not the AI model' },
      { type: 'p', text: 'The instinct when evaluating edge AI readiness is to start with model requirements — sampling rate, feature set, latency budget. That is the wrong starting point for a brownfield fleet. The first question is whether the device can expose the data the model needs, at the rate it needs it, without a forklift upgrade.' },
      { type: 'list', items: [
        'Modbus RTU (serial): typically 9600–19200 baud, often a shared multi-drop bus. Effective polling rates across a full register map are usually 1–5Hz at best — adequate for slow-changing variables like tank levels, inadequate for vibration or current-waveform analysis.',
        'Modbus TCP: removes the serial bottleneck but inherits the same register-map limitations — no native timestamping, no built-in alarm/event model, polling-only.',
        'OPC-UA: supports subscriptions (server pushes changes rather than waiting to be polled), native timestamps, and a richer type system — meaningfully better fit for edge AI pipelines that need accurately timestamped, event-driven data.',
      ] },

      { type: 'callout', tone: 'cyan', title: 'The polling-rate trap', text: 'A device that supports Modbus does not mean it supports the polling rate your model needs. We have seen teams build a vibration-anomaly model assuming 100Hz sampling, only to discover the PLC\'s actual register refresh internally happens at 10Hz — the extra resolution was being interpolated, not measured.' },

      { type: 'h2', text: 'A four-tier readiness model' },
      { type: 'p', text: 'We typically sort an existing fleet into four readiness tiers before scoping any edge AI integration work:' },

      { type: 'h3', text: 'Tier 1 — Ready today' },
      { type: 'p', text: 'OPC-UA native devices, or Modbus TCP devices with documented register maps and a polling rate that already meets or exceeds the target model\'s sampling requirement. These connect to an edge gateway with configuration only, no firmware or hardware changes.' },

      { type: 'h3', text: 'Tier 2 — Gateway-bridgeable' },
      { type: 'p', text: 'Modbus RTU or older fieldbus devices where an edge gateway can poll at the device\'s native rate and re-publish over OPC-UA or MQTT for the inference pipeline. The device itself does not change; an intermediary does the protocol translation and, where needed, timestamp normalization.' },

      { type: 'h3', text: 'Tier 3 — Sensor augmentation required' },
      { type: 'p', text: 'Devices where the native protocol cannot expose data at a useful rate or resolution for the target use case — most commonly vibration, acoustic, or high-frequency current signatures. Here the practical path is adding a purpose-built edge sensor (accelerometer, current clamp with onboard ADC) alongside the legacy controller rather than trying to extract that signal through Modbus.' },

      { type: 'h3', text: 'Tier 4 — Replacement candidates' },
      { type: 'p', text: 'A small minority of devices, usually controllers with no documented register map, proprietary undocumented protocols, or hardware old enough that even basic polling is unreliable. These are flagged for eventual replacement rather than integration — the engineering cost of reverse-engineering an undocumented protocol typically exceeds the cost of a planned hardware refresh.' },

      { type: 'stat-row', items: [
        { value: '~60%', label: 'Of audited fleets fall into Tier 1 or 2 with no hardware change' },
        { value: '~30%', label: 'Require targeted sensor augmentation (Tier 3)' },
        { value: '~10%', label: 'Flagged as replacement candidates (Tier 4)' },
      ] },

      { type: 'h2', text: 'Timestamp consistency is the quiet failure mode' },
      { type: 'p', text: 'Even within Tier 1 and 2 devices, one issue surfaces repeatedly: inconsistent or absent timestamping at the source. Modbus has no native concept of "when was this value last updated" — a polling client assumes the value is current at poll time, which is not always true if the underlying physical sensor updates more slowly than the poll interval.' },
      { type: 'p', text: 'For any model that depends on rate-of-change rather than absolute value — which is most predictive maintenance use cases — this matters more than raw accuracy of the value itself. We recommend timestamping at the edge gateway, at the moment of ingestion, rather than trusting an assumed poll-time timestamp, and explicitly tracking gateway-to-sensor latency as a monitored metric rather than an assumption.' },

      { type: 'quote', text: 'The hardest part of brownfield edge AI is rarely the model. It is building enough trust in the timestamp on each data point to know whether the model is reacting to reality or to polling artifacts.', attribution: 'Field integration notes, Device-Nova solutions team' },

      { type: 'h2', text: 'A practical first step' },
      { type: 'p', text: 'Before scoping any model work, we recommend a one-to-two-week fleet audit: catalog every device\'s protocol, documented and actual polling rate, and timestamp behavior. This audit alone typically resolves more deployment risk than any amount of additional model tuning — most missed industrial AI deployment timelines trace back to integration assumptions made before the audit, not model performance after it.' },
    ],
  },

  'digital-twins-without-cloud-round-trip': {
    slug: 'digital-twins-without-cloud-round-trip',
    title: 'Digital twins without the cloud round trip',
    category: 'Architecture',
    date: 'March 14, 2026',
    readTime: '10 min read',
    author: { name: 'Priya Nair', role: 'Distributed Systems Lead' },
    excerpt:
      'How distributed AI at the device layer changes the economics and latency profile of digital twin simulations.',
    tags: ['Digital Twin', 'Distributed Systems', 'Edge Architecture'],
    body: [
      { type: 'p', text: 'A digital twin is, at its core, a synchronization problem: keep a simulated model of a physical asset close enough to the asset\'s real state that decisions made against the twin are valid against reality. Most digital twin architectures solve this synchronization problem over a network — physical asset telemetry flows up to a cloud-hosted twin, the twin updates, and any twin-derived decision flows back down.' },
      { type: 'p', text: 'That architecture works well when the twin is used for things that are not time-critical: long-range capacity planning, what-if scenario modeling, fleet-wide comparative analysis. It becomes a liability when the twin is meant to inform real-time control decisions, because every synchronization cycle inherits the same network round-trip cost discussed in most cloud-dependent industrial AI pipelines.' },

      { type: 'h2', text: 'Moving the twin onto the same hardware as the asset' },
      { type: 'p', text: 'The alternative architecture runs a lightweight version of the twin\'s simulation model directly on the edge device co-located with the physical asset. Instead of synchronizing state over a network, the twin and the asset share the same local clock and the same sensor bus. The synchronization problem changes shape entirely.' },
      { type: 'list', items: [
        'Network-synchronized twin: state divergence is a function of network latency and jitter — the twin is always describing a slightly stale past.',
        'Co-located edge twin: state divergence is a function of local compute latency only, typically one to two orders of magnitude smaller and far more predictable.',
      ] },

      { type: 'callout', tone: 'cyan', title: 'A different kind of problem', text: 'When the twin runs on the same hardware as the physical asset, "how stale is the twin" stops being a network monitoring question and becomes a local compute scheduling question — a fundamentally easier problem to reason about and engineer around.' },

      { type: 'h2', text: 'What this enables in practice' },
      { type: 'h3', text: 'Real-time what-if branching' },
      { type: 'p', text: 'A co-located twin can run short-horizon "what if" branches against near-current state — for example, simulating the thermal effect of increasing motor load by 15% over the next 30 seconds — and return an answer within the same control loop\'s decision window. A cloud-synchronized twin running the same simulation is reasoning against state that may already be tens or hundreds of milliseconds stale by the time the result returns.' },

      { type: 'h3', text: 'Graceful degradation during connectivity loss' },
      { type: 'p', text: 'Industrial sites lose connectivity. A cloud-dependent twin goes dark, or worse, silently continues operating on the last known state without flagging that it is no longer synchronized. An edge-resident twin continues operating on genuinely current local sensor data throughout a connectivity gap, and only the eventual cloud-aggregated rollup — used for fleet-wide analytics, not local control — is delayed.' },

      { type: 'h3', text: 'Lower cloud compute cost at fleet scale' },
      { type: 'p', text: 'Running thousands of full-fidelity twin simulations continuously in the cloud is a meaningful, scaling compute cost. Distributing lightweight twin instances to the edge devices themselves, and only sending aggregated state changes upward, shifts most of that compute cost to hardware that is already deployed and otherwise idle between control-loop cycles.' },

      { type: 'stat-row', items: [
        { value: '~70%', label: 'Typical reduction in cloud compute cost for twin-heavy fleets after edge migration' },
        { value: '<5ms', label: 'Typical edge twin state-divergence vs. physical asset, under normal load' },
        { value: '100%', label: 'Local control continuity maintained during a connectivity gap' },
      ] },

      { type: 'h2', text: 'The trade-off: simulation fidelity' },
      { type: 'p', text: 'This is not a free upgrade. Edge hardware has real compute and memory constraints, which means an edge-resident twin is necessarily a reduced-fidelity model compared to what a cloud GPU cluster could run. The engineering discipline here is identifying which fidelity reductions are acceptable for the specific control decisions the twin needs to inform, and reserving full-fidelity simulation for the cloud-side use cases — scenario planning, design validation — that are not time-critical and can tolerate the model being larger and slower.' },

      { type: 'quote', text: 'The right twin architecture is rarely "edge or cloud" in isolation. It is a tiered model: a fast, reduced-fidelity twin at the edge for control decisions, and a full-fidelity twin in the cloud for everything that has the luxury of time.', attribution: 'Architecture review notes, Device-Nova platform team' },

      { type: 'h2', text: 'Where to start' },
      { type: 'p', text: 'For teams evaluating this shift, the most useful first step is not migrating an entire existing twin architecture at once. It is identifying the one or two control decisions currently bottlenecked by twin synchronization latency, and prototyping an edge-resident twin for those specific decisions while leaving the broader analytical twin infrastructure untouched. The architecture earns its complexity one validated use case at a time.' },
    ],
  },

  'predictive-maintenance-models': {
    slug: 'predictive-maintenance-models',
    title: "Inside Device-Nova's predictive maintenance model pipeline",
    category: 'Engineering',
    date: 'February 8, 2026',
    readTime: '15 min read',
    author: { name: 'Alex Voss', role: 'Head of Applied ML' },
    excerpt:
      'An end-to-end walkthrough of how sensor telemetry becomes a maintenance prediction, from edge feature engineering to production alerting.',
    tags: ['Predictive Maintenance', 'Model Pipeline', 'Edge Inference', 'ARM Quantization'],
    body: [
      { type: 'p', text: 'Predictive maintenance is one of the most commonly cited edge AI use cases, and also one of the most commonly oversimplified. "Detect failures before they happen" is the pitch; the actual pipeline from raw sensor telemetry to a maintenance alert someone trusts enough to act on involves several distinct stages, each with its own failure modes.' },
      { type: 'p', text: 'This walkthrough follows that pipeline stage by stage, using a representative rotating-equipment use case — bearing health monitoring on industrial motors — as the running example.' },

      { type: 'h2', text: '1. Data ingestion at the edge' },
      { type: 'p', text: 'Bearing health monitoring typically relies on vibration data sampled well above what a standard PLC register can expose — often 1kHz to 10kHz, far beyond Modbus-era polling rates. This is gathered from a dedicated accelerometer wired directly into the edge gateway, not pulled through the existing control network.' },
      { type: 'p', text: 'At this stage the goal is simply reliable, consistently timestamped raw signal capture. No feature engineering happens yet — any premature transformation here risks discarding information a later model iteration might need.' },

      { type: 'h2', text: '2. Feature engineering at the edge' },
      { type: 'p', text: 'Raw vibration waveforms are rarely fed directly into a model. The pipeline extracts a feature set on-device, in near real time:' },
      { type: 'list', items: [
        'Time-domain features: RMS amplitude, kurtosis, peak-to-peak — sensitive to overall vibration energy and impulsiveness.',
        'Frequency-domain features: FFT-derived spectral peaks at bearing defect frequencies (ball pass frequency, cage frequency), which shift characteristically as specific failure modes develop.',
        'Envelope analysis: demodulated high-frequency resonance, useful for detecting early-stage bearing defects before they show up clearly in the raw time or frequency domain.',
      ] },
      { type: 'p', text: 'Doing this extraction on-device rather than shipping raw waveforms to the cloud reduces the data volume by roughly two orders of magnitude before it ever needs to leave the gateway — a meaningful bandwidth and cost consideration at fleet scale, independent of the latency argument.' },

      { type: 'h2', text: '3. Model architecture and quantization' },
      { type: 'p', text: 'The production model is a lightweight gradient-boosted ensemble trained on the engineered feature set, not a large deep network — for this feature-based approach, the marginal accuracy gain from a larger architecture rarely justifies the added inference cost on constrained ARM-based edge hardware.' },
      { type: 'p', text: 'Where deep models are used — for example, for raw-waveform anomaly detection in cases where engineered features miss novel failure signatures — they go through post-training quantization to INT8 before deployment. This typically reduces model size by roughly 4x and inference latency by 2-3x on ARM targets, at a measured accuracy cost we validate stays under 1% on held-out test data before any production rollout.' },

      { type: 'callout', tone: 'cyan', title: 'Quantization is not free', text: 'INT8 quantization can degrade accuracy unevenly across the input distribution — often worst on the rarer, more subtle early-stage fault signatures that matter most for predictive maintenance. We validate quantized model accuracy specifically on minority-class (early-fault) samples, not just aggregate accuracy, before any deployment.' },

      { type: 'h2', text: '4. Confidence calibration' },
      { type: 'p', text: 'A model that outputs "87% probability of bearing fault within 14 days" is only useful if that 87% means what it says. Raw model outputs, especially from gradient-boosted ensembles, are frequently miscalibrated — a model might output 87% confidence on predictions that are actually correct only 60% of the time.' },
      { type: 'p', text: 'The pipeline applies post-hoc calibration (isotonic regression, validated against held-out failure events) before any confidence score reaches a production alert. This step is, in our experience, the single most under-invested stage across the industry\'s predictive maintenance pipelines — and the most common reason maintenance teams stop trusting model alerts after a handful of false positives.' },

      { type: 'stat-row', items: [
        { value: '4x', label: 'Typical model size reduction after INT8 quantization' },
        { value: '2-3x', label: 'Typical inference latency improvement, same hardware' },
        { value: '<1%', label: 'Accuracy cost ceiling we require before any quantized model ships' },
      ] },

      { type: 'h2', text: '5. Production alerting and feedback loop' },
      { type: 'p', text: 'A calibrated confidence score still needs a decision threshold, and that threshold is a business decision, not a purely statistical one — it trades off false positives (maintenance teams investigating non-issues) against false negatives (missed early failure signals). We work with each site\'s maintenance team to set thresholds against their actual cost of an unnecessary inspection versus an unplanned failure, rather than shipping a single global default.' },
      { type: 'p', text: 'Every alert outcome — confirmed fault, false positive, missed fault discovered later — feeds back into the next model retraining cycle. This feedback loop, more than any single architectural choice, is what determines whether a predictive maintenance deployment\'s accuracy improves or stagnates after initial rollout.' },

      { type: 'quote', text: 'The model on day one is the easy part. The feedback loop that makes the model on day 200 better than day one is the actual product.', attribution: 'Internal retrospective, Device-Nova applied ML team' },

      { type: 'h2', text: 'Benchmark context' },
      { type: 'p', text: 'Against a cloud-only baseline running the equivalent feature-engineering and inference pipeline server-side, the edge-deployed version in our internal benchmarks showed comparable model accuracy (within calibration noise) with a 20-30x reduction in end-to-end decision latency and roughly 95% reduction in network bandwidth consumed per device, due to shipping engineered features and alerts rather than raw waveform data.' },
      { type: 'p', text: 'The takeaway for teams building or evaluating a predictive maintenance pipeline: the model architecture decision matters less than most teams initially assume. Feature engineering quality, quantization validation, and confidence calibration are where deployments succeed or quietly fail.' },
    ],
  },
};

export const getPost = (slug) => POSTS[slug] || null;
export const getAllPosts = () => Object.values(POSTS);
export const getAdjacentPosts = (slug) => {
  const slugs = Object.keys(POSTS);
  const idx = slugs.indexOf(slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? POSTS[slugs[idx - 1]] : null,
    next: idx < slugs.length - 1 ? POSTS[slugs[idx + 1]] : null,
  };
};
export const getRelatedPosts = (slug, category, count = 2) => {
  return Object.values(POSTS)
    .filter((p) => p.slug !== slug && p.category === category)
    .slice(0, count)
    .concat(
      Object.values(POSTS)
        .filter((p) => p.slug !== slug && p.category !== category)
        .slice(0, Math.max(0, count - 1))
    )
    .slice(0, count);
};

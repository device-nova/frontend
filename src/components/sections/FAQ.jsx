import SectionHeader from '../ui/SectionHeader.jsx';
import Accordion from '../ui/Accordion.jsx';

const FAQ_ITEMS = [
  {
    question: 'What hardware does Device-Nova run on?',
    answer:
      'Device-Nova is compatible with ARM Cortex-A series processors, x86 industrial computers, and NVIDIA Jetson modules (Nano, Xavier NX, Orin). The minimum spec for full inference capability is a Cortex-A55 at 1.8 GHz with 1 GB RAM. For GPU-accelerated inference, NVIDIA Jetson hardware is the recommended deployment target. We maintain a certified hardware compatibility list updated quarterly.',
  },
  {
    question: 'How does Device-Nova integrate with existing SCADA and PLC systems?',
    answer:
      'Device-Nova connects to existing SCADA and PLC infrastructure via OPC-UA, Modbus TCP/IP, MQTT, and PROFINET — no firmware modification to existing equipment is required. The Edge AI engine operates as a passive listener by default, which means your current control logic continues to function unchanged while Device-Nova builds its inference layer on top. Active closed-loop control integration is available for supported hardware and requires an engineering engagement.',
  },
  {
    question: 'What happens to inference if the internet connection is unavailable?',
    answer:
      'Inference runs entirely on-device and has no dependency on cloud availability. Device-Nova was architected specifically for environments where connectivity is intermittent or unreliable. The edge node stores all telemetry, model outputs, and alert history locally. When connectivity is restored, the Edge-to-Cloud Sync layer uploads the backlog on a configurable schedule. You define which data leaves the device and when.',
  },
  {
    question: 'How is device data secured in transit and at rest?',
    answer:
      'All inter-node communication uses mutual TLS (mTLS) with certificate rotation managed by the orchestration layer. AI model artifacts are cryptographically signed at build time and verified before deployment to any edge device. Data at rest on the edge device is encrypted using AES-256. Access to the management plane is governed by RBAC with full audit logging. Device-Nova supports SAML 2.0 and OIDC for single sign-on integration with existing enterprise identity providers.',
  },
  {
    question: 'How long does a typical deployment take?',
    answer:
      'A typical pilot deployment — from network access to first live inference output — takes two to four days for environments where hardware is pre-provisioned and network access to edge devices is available. Multi-site production deployments targeting 100+ devices typically complete within four to eight weeks, including custom model configuration, integration testing, and operator training. We assign a dedicated integration engineer to all Professional and Enterprise deployments.',
  },
  {
    question: 'What AI/ML frameworks does Device-Nova support for custom model deployment?',
    answer:
      'Device-Nova natively imports models in ONNX, TensorFlow Lite, and TensorRT formats. PyTorch models can be converted to ONNX via standard tooling before deployment. The platform includes an NVIDIA TensorRT optimization pipeline that automatically recompiles models to match the target device\'s compute profile. Custom pre/post-processing logic can be added as Python or C++ plugins attached to the inference pipeline.',
  },
  {
    question: 'Is Device-Nova priced per device or per site?',
    answer:
      'Pricing is per connected device on a monthly or annual basis. A "device" is any edge node running the Device-Nova inference runtime — sensors, PLCs, gateways, and edge servers each count as one device. The orchestration and dashboard infrastructure is included in all plans at no additional charge. Enterprise contracts can include site-level or fleet-level pricing for large deployments; contact the sales team to discuss custom structures.',
  },
  {
    question: 'Can Device-Nova be deployed on-premise without any cloud dependency?',
    answer:
      'Yes. The Enterprise plan includes a fully on-premise deployment option where the orchestration layer, model registry, and intelligence dashboard all run within your own data center or air-gapped environment. In this configuration there is no egress to Device-Nova infrastructure; the entire platform operates on hardware you control. On-premise deployments require a dedicated engineering engagement for initial setup.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-void section-pad">
      <div className="container-base">
        <SectionHeader
          eyebrow="FAQ"
          title="Common questions from evaluation teams"
          description="Answers reflect the most frequent technical and commercial questions raised during enterprise evaluation cycles."
        />

        <div className="max-w-3xl mx-auto">
          <Accordion items={FAQ_ITEMS} />
        </div>
      </div>
    </section>
  );
}

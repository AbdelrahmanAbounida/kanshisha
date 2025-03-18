export interface AIModlel {
  activity: "manual" | "Auto Triggered";
  updatedAt: Date;
  status: "running" | "successful" | "failed";
  losses: number;
  datasetSize: number;
}
export const DEMO_AI_MODELS: AIModlel[] = [
  {
    activity: "manual",
    status: "successful",
    losses: 0.12,
    datasetSize: 10200,
    updatedAt: new Date("2024-06-28"),
  },
  {
    activity: "Auto Triggered",
    status: "running",
    losses: 0.08,
    datasetSize: 20231,
    updatedAt: new Date("2024-06-29"),
  },
  {
    activity: "Auto Triggered",
    status: "failed",
    losses: 0.093,
    datasetSize: 43123,
    updatedAt: new Date("2024-06-30"),
  },
];

export interface ModelCode {
  python: string;
  cpp: string;
}

export const DEMO_MODEL_CODE: ModelCode = {
  python: `import torch
import torch.nn as nn
import torch.optim as optim

# Define a simple model (for example purposes)
class SimpleModel(nn.Module):
    def __init__(self):
        super(SimpleModel, self).__init__()
        self.fc1 = nn.Linear(10, 5)
        self.fc2 = nn.Linear(5, 1)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x

# Load the trained model
model = SimpleModel()
model.load_state_dict(torch.load("model.pth"))  # Load trained weights
model.eval()  # Set to evaluation mode

# Run inference on a sample input
sample_input = torch.rand(1, 10)  # Example input (1 sample, 10 features)
output = model(sample_input)

print("Model Output:", output.item())
`,
  cpp: `#include <torch/script.h> // Include the PyTorch C++ API
#include <iostream>

int main() {
    // Load the trained model
    std::string model_path = "model.pt"; // Exported as TorchScript
    torch::jit::script::Module model;

    try {
        model = torch::jit::load(model_path); // Load model
    } catch (const c10::Error& e) {
        std::cerr << "Error loading the model!\n";
        return -1;
    }

    // Create a sample input tensor (1 sample, 10 features)
    std::vector<torch::jit::IValue> inputs;
    inputs.push_back(torch::randn({1, 10}));

    // Run inference
    at::Tensor output = model.forward(inputs).toTensor();

    std::cout << "Model Output: " << output.item<float>() << std::endl;
    return 0;
}
`,
};

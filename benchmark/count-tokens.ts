import { readFileSync } from 'fs';
import { join } from 'path';
import { encoding_for_model } from 'tiktoken';

const scenarios = [
  {
    id: 'A',
    name: 'Cenário A (Local): Alterar regra de validação do cupom de desconto',
    traditionalFiles: [
      'apps/traditional/src/services/discountService.ts',
      'apps/traditional/src/components/CouponInput.tsx'
    ],
    fsdFiles: [
      'apps/fsd/src/shared/api/index.ts',
      'apps/fsd/src/features/apply-coupon/model/applyCoupon.ts',
      'apps/fsd/src/features/apply-coupon/ui/CouponForm.tsx'
    ]
  },
  {
    id: 'B',
    name: "Cenário B (Entidade): Adicionar um novo campo de 'avaliação/rating' ao produto e refleti-lo na interface",
    traditionalFiles: [
      'apps/traditional/src/types/product.ts',
      'apps/traditional/src/services/api.ts',
      'apps/traditional/src/components/ProductCard.tsx'
    ],
    fsdFiles: [
      'apps/fsd/src/entities/product/model/types.ts',
      'apps/fsd/src/shared/api/index.ts',
      'apps/fsd/src/entities/product/ui/ProductCard.tsx'
    ]
  },
  {
    id: 'C',
    name: 'Cenário C (Regra de Negócio): Alterar o cálculo global de frete ou total do carrinho',
    traditionalFiles: [
      'apps/traditional/src/types/cart.ts',
      'apps/traditional/src/components/CartDrawer.tsx',
      'apps/traditional/src/hooks/useCart.ts'
    ],
    fsdFiles: [
      'apps/fsd/src/entities/cart/model/index.ts',
      'apps/fsd/src/widgets/cart-drawer/ui/CartDrawer.tsx',
      'apps/fsd/src/pages/home/ui/HomePage.tsx'
    ]
  }
];

const countTokens = (files: string[], encoder: any, basePath: string): number => {
  let total = 0;
  for (const file of files) {
    try {
      const content = readFileSync(join(basePath, file), 'utf-8');
      total += encoder.encode(content).length;
    } catch (e) {
      console.warn(`File not found: ${file}`);
    }
  }
  return total;
};

const runBenchmark = () => {
  const encoder = encoding_for_model('gpt-4o');
const basePath = process.cwd();
  
  let markdown = '## Comparativo de Consumo de Tokens (GPT-4o)\n\n';
  markdown += '| Cenário | Traditional (Tokens) | FSD (Tokens) | Diferença (FSD - Trad) |\n';
  markdown += '|---------|----------------------|--------------|------------------------|\n';

  for (const scenario of scenarios) {
    const tradTokens = countTokens(scenario.traditionalFiles, encoder, basePath);
    const fsdTokens = countTokens(scenario.fsdFiles, encoder, basePath);
    const diff = fsdTokens - tradTokens;
    const diffStr = diff > 0 ? `+${diff}` : `${diff}`;
    
    markdown += `| **${scenario.id}** - ${scenario.name} | ${tradTokens} | ${fsdTokens} | ${diffStr} |\n`;
  }

  console.log(markdown);
  encoder.free();
};

runBenchmark();
